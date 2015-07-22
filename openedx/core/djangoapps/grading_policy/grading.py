import logging
from . import get_grading_type
from courseware.model_data import ScoresClient
from courseware.grades import manual_transaction
from courseware.module_render import get_module_for_descriptor
from util.module_utils import yield_dynamic_descriptor_descendants
from student.models import anonymous_id_for_user
from xmodule import graders
from xmodule.graders import Score
from xmodule.exceptions import UndefinedContext
from submissions import api as sub_api  # installed from the edx-submissions repository


log = logging.getLogger("openedx.core.grading.policy")


class MaxScoresCache(object):
    """
    A cache for unweighted max scores for problems.

    The key assumption here is that any problem that has not yet recorded a
    score for a user is worth the same number of points. An XBlock is free to
    score one student at 2/5 and another at 1/3. But a problem that has never
    issued a score -- say a problem two students have only seen mentioned in
    their progress pages and never interacted with -- should be worth the same
    number of points for everyone.
    """
    def __init__(self, cache_prefix):
        self.cache_prefix = cache_prefix
        self._max_scores_cache = {}
        self._max_scores_updates = {}

    @classmethod
    def create_for_course(cls, course):
        """
        Given a CourseDescriptor, return a correctly configured `MaxScoresCache`

        This method will base the `MaxScoresCache` cache prefix value on the
        last time something was published to the live version of the course.
        This is so that we don't have to worry about stale cached values for
        max scores -- any time a content change occurs, we change our cache
        keys.
        """
        return cls(u"{}.{}".format(course.id, course.subtree_edited_on.isoformat()))

    def fetch_from_remote(self, locations):
        """
        Populate the local cache with values from django's cache
        """
        remote_dict = cache.get_many([self._remote_cache_key(loc) for loc in locations])
        self._max_scores_cache = {
            self._local_cache_key(remote_key): value
            for remote_key, value in remote_dict.items()
            if value is not None
        }

    def push_to_remote(self):
        """
        Update the remote cache
        """
        if self._max_scores_updates:
            cache.set_many(
                {
                    self._remote_cache_key(key): value
                    for key, value in self._max_scores_updates.items()
                },
                60 * 60 * 24  # 1 day
            )

    def _remote_cache_key(self, location):
        """Convert a location to a remote cache key (add our prefixing)."""
        return u"grades.MaxScores.{}___{}".format(self.cache_prefix, unicode(location))

    def _local_cache_key(self, remote_key):
        """Convert a remote cache key to a local cache key (i.e. location str)."""
        return remote_key.split(u"___", 1)[1]

    def num_cached_from_remote(self):
        """How many items did we pull down from the remote cache?"""
        return len(self._max_scores_cache)

    def num_cached_updates(self):
        """How many local updates are we waiting to push to the remote cache?"""
        return len(self._max_scores_updates)

    def set(self, location, max_score):
        """
        Adds a max score to the max_score_cache
        """
        loc_str = unicode(location)
        if self._max_scores_cache.get(loc_str) != max_score:
            self._max_scores_updates[loc_str] = max_score

    def get(self, location):
        """
        Retrieve a max score from the cache
        """
        loc_str = unicode(location)
        max_score = self._max_scores_updates.get(loc_str)
        if max_score is None:
            max_score = self._max_scores_cache.get(loc_str)

        return max_score


def descriptor_affects_grading(block_types_affecting_grading, descriptor):
    """
    Returns True if the descriptor could have any impact on grading, else False.

    Something might be a scored item if it is capable of storing a score
    (has_score=True). We also have to include anything that can have children,
    since those children might have scores. We can avoid things like Videos,
    which have state but cannot ever impact someone's grade.
    """
    return descriptor.location.block_type in block_types_affecting_grading


def field_data_cache_for_grading(course, user):
    """
    Given a CourseDescriptor and User, create the FieldDataCache for grading.

    This will generate a FieldDataCache that only loads state for those things
    that might possibly affect the grading process, and will ignore things like
    Videos.
    """
    descriptor_filter = partial(descriptor_affects_grading, course.block_types_affecting_grading)
    return FieldDataCache.cache_for_descriptor_descendents(
        course.id,
        user,
        course,
        depth=None,
        descriptor_filter=descriptor_filter
    )


class CourseGrading(object):
    """Base class, that provides methods to grade courses."""
    GRADING_TYPE = get_grading_type()

    @staticmethod
    def grade(*args, **kwargs):
        """Wraps "_grade"."""
        return _grade(*args, **kwargs)

    @classmethod
    def progress_summary(cls, *args, **kwargs):
        """Wraps "_progress_summary" and passes GRADING_TYPE."""
        return _progress_summary(cls.GRADING_TYPE, *args, **kwargs)

    @classmethod
    def grading_context(cls, *args, **kwargs):
        """Wraps "_grading_context" and passes GRADING_TYPE."""
        return _grading_context(cls.GRADING_TYPE, *args, **kwargs)


def _grade(student, request, course, keep_raw_scores, field_data_cache, scores_client):
    """
    Unwrapped version of "grade"

    This grades a student as quickly as possible. It returns the
    output from the course grader, augmented with the final letter
    grade. The keys in the output are:

    course: a CourseDescriptor

    - grade : A final letter grade.
    - percent : The final percent for the class (rounded up).
    - section_breakdown : A breakdown of each section that makes
      up the grade. (For display)
    - grade_breakdown : A breakdown of the major components that
      make up the final grade. (For display)
    - keep_raw_scores : if True, then value for key 'raw_scores' contains scores
      for every graded module

    More information on the format is in the docstring for CourseGrader.
    """
    if field_data_cache is None:
        with manual_transaction():
            field_data_cache = field_data_cache_for_grading(course, student)
    if scores_client is None:
        scores_client = ScoresClient.from_field_data_cache(field_data_cache)

    # Dict of item_ids -> (earned, possible) point tuples. This *only* grabs
    # scores that were registered with the submissions API, which for the moment
    # means only openassessment (edx-ora2)
    submissions_scores = sub_api.get_scores(course.id.to_deprecated_string(), anonymous_id_for_user(student, course.id))
    max_scores_cache = MaxScoresCache.create_for_course(course)
    # For the moment, we have to get scorable_locations from field_data_cache
    # and not from scores_client, because scores_client is ignorant of things
    # in the submissions API. As a further refactoring step, submissions should
    # be hidden behind the ScoresClient.
    max_scores_cache.fetch_from_remote(field_data_cache.scorable_locations)

    grading_context = course.grading_context
    raw_scores = []

    totaled_scores = {}
    # This next complicated loop is just to collect the totaled_scores, which is
    # passed to the grader
    for section_format, sections in grading_context['graded_sections'].iteritems():
        format_scores = []
        for section in sections:
            section_descriptor = section['section_descriptor']
            section_name = section_descriptor.display_name_with_default

            # some problems have state that is updated independently of interaction
            # with the LMS, so they need to always be scored. (E.g. foldit.,
            # combinedopenended)
            should_grade_section = any(
                descriptor.always_recalculate_grades for descriptor in section['xmoduledescriptors']
            )

            # If there are no problems that always have to be regraded, check to
            # see if any of our locations are in the scores from the submissions
            # API. If scores exist, we have to calculate grades for this section.
            if not should_grade_section:
                should_grade_section = any(
                    descriptor.location.to_deprecated_string() in submissions_scores
                    for descriptor in section['xmoduledescriptors']
                )

            if not should_grade_section:
                should_grade_section = any(
                    descriptor.location in scores_client
                    for descriptor in section['xmoduledescriptors']
                )

            # If we haven't seen a single problem in the section, we don't have
            # to grade it at all! We can assume 0%
            if should_grade_section:
                scores = []

                def create_module(descriptor):
                    '''creates an XModule instance given a descriptor'''
                    # TODO: We need the request to pass into here. If we could forego that, our arguments
                    # would be simpler
                    return get_module_for_descriptor(
                        student, request, descriptor, field_data_cache, course.id, course=course
                    )

                descendants = yield_dynamic_descriptor_descendants(section_descriptor, student.id, create_module)
                for module_descriptor in descendants:
                    (correct, total) = get_score(
                        student,
                        module_descriptor,
                        create_module,
                        scores_client,
                        submissions_scores,
                        max_scores_cache,
                    )
                    if correct is None and total is None:
                        continue

                    if settings.GENERATE_PROFILE_SCORES:    # for debugging!
                        if total > 1:
                            correct = random.randrange(max(total - 2, 1), total + 1)
                        else:
                            correct = total

                    graded = module_descriptor.graded
                    if not total > 0:
                        # We simply cannot grade a problem that is 12/0, because we might need it as a percentage
                        graded = False

                    scores.append(
                        Score(
                            correct,
                            total,
                            graded,
                            module_descriptor.display_name_with_default,
                            module_descriptor.location
                        )
                    )

                __, graded_total = graders.aggregate_scores(scores, section_name)
                if keep_raw_scores:
                    raw_scores += scores
            else:
                graded_total = Score(0.0, 1.0, True, section_name, None)

            #Add the graded total to totaled_scores
            if graded_total.possible > 0:
                format_scores.append(graded_total)
            else:
                log.info(
                    "Unable to grade a section with a total possible score of zero. " +
                    str(section_descriptor.location)
                )

        totaled_scores[section_format] = format_scores

    # Grading policy might be overriden by a CCX, need to reset it
    course.set_grading_policy(course.grading_policy)
    grade_summary = course.grader.grade(totaled_scores, generate_random_scores=settings.GENERATE_PROFILE_SCORES)

    # We round the grade here, to make sure that the grade is an whole percentage and
    # doesn't get displayed differently than it gets grades
    grade_summary['percent'] = round(grade_summary['percent'] * 100 + 0.05) / 100

    letter_grade = grade_for_percentage(course.grade_cutoffs, grade_summary['percent'])
    grade_summary['grade'] = letter_grade
    grade_summary['totaled_scores'] = totaled_scores   # make this available, eg for instructor download & debugging
    if keep_raw_scores:
        # way to get all RAW scores out to instructor
        # so grader can be double-checked
        grade_summary['raw_scores'] = raw_scores

    max_scores_cache.push_to_remote()

    return grade_summary


# TODO: This method is not very good. It was written in the old course style and
# then converted over and performance is not good. Once the progress page is redesigned
# to not have the progress summary this method should be deleted (so it won't be copied).
def _progress_summary(grading_type, student, request, course, field_data_cache=None, scores_client=None):
    """
    Unwrapped version of "progress_summary".

    This pulls a summary of all problems in the course.

    Returns
    - courseware_summary is a summary of all sections with problems in the course.
    It is organized as an array of chapters, each containing an array of sections,
    each containing an array of scores. This contains information for graded and
    ungraded problems, and is good for displaying a course summary with due dates,
    etc.

    Arguments:
        student: A User object for the student to grade
        course: A Descriptor containing the course to grade

    If the student does not have access to load the course module, this function
    will return None.

    """

    with manual_transaction():
        if field_data_cache is None:
            field_data_cache = field_data_cache_for_grading(course, student)
        if scores_client is None:
            scores_client = ScoresClient.from_field_data_cache(field_data_cache)

        course_module = get_module_for_descriptor(
            student, request, course, field_data_cache, course.id, course=course
        )
        if not course_module:
            return None

        course_module = getattr(course_module, '_x_module', course_module)

    submissions_scores = sub_api.get_scores(
        course.id.to_deprecated_string(), anonymous_id_for_user(student, course.id)
    )
    max_scores_cache = MaxScoresCache.create_for_course(course)
    # For the moment, we have to get scorable_locations from field_data_cache
    # and not from scores_client, because scores_client is ignorant of things
    # in the submissions API. As a further refactoring step, submissions should
    # be hidden behind the ScoresClient.
    max_scores_cache.fetch_from_remote(field_data_cache.scorable_locations)

    blocks_stack = [course]
    blocks_dict = {}

    while blocks_stack:
        curr_block = blocks_stack.pop()
        with manual_transaction():
            # Skip if the block is hidden
            if curr_block.hide_from_toc:
                continue

            key = unicode(curr_block.scope_ids.usage_id)
            children = curr_block.get_display_items() if curr_block.category != grading_type else []
            block = {
                'display_name': curr_block.display_name_with_default,
                'block_type': curr_block.category,
                'url_name': curr_block.url_name,
                'children': [unicode(child.scope_ids.usage_id) for child in children],
            }

            if curr_block.category == grading_type:
                graded = curr_block.graded
                scores = []

                module_creator = curr_block.xmodule_runtime.get_module
                for module_descriptor in yield_dynamic_descriptor_descendants(
                        curr_block, student.id, module_creator
                ):
                    course_id = course.id
                    (correct, total) = get_score(
                        student,
                        module_descriptor,
                        module_creator,
                        scores_client,
                        submissions_scores,
                        max_scores_cache,
                    )

                    if correct is None and total is None:
                        continue

                    scores.append(
                        Score(
                            correct,
                            total,
                            graded,
                            module_descriptor.display_name_with_default,
                            module_descriptor.location
                        )
                    )

                scores.reverse()
                total, _ = graders.aggregate_scores(scores, curr_block.display_name_with_default)

                module_format = curr_block.format if curr_block.format is not None else ''
                block.update({
                    'scores': scores,
                    'total': total,
                    'format': module_format,
                    'due': curr_block.due,
                    'graded': graded,
                })

            blocks_dict[key] = block
            # Add this blocks children to the stack so that we can traverse them as well.
            blocks_stack.extend(children)

    max_scores_cache.push_to_remote()

    return {
        'root': unicode(course.scope_ids.usage_id),
        'blocks': blocks_dict,
    }


def _grading_context(grading_type, course):
    """
    This returns a dictionary with keys necessary for quickly grading
    a student. They are used by grades.grade()

    The grading context has two keys:
    graded_sections - This contains the sections that are graded, as
        well as all possible children modules that can affect the
        grading. This allows some sections to be skipped if the student
        hasn't seen any part of it.

        The format is a dictionary keyed by section-type. The values are
        arrays of dictionaries containing
            "section_descriptor" : The section descriptor
            "xmoduledescriptors" : An array of xmoduledescriptors that
                could possibly be in the section, for any student

    all_descriptors - This contains a list of all xmodules that can
        effect grading a student. This is used to efficiently fetch
        all the xmodule state for a FieldDataCache without walking
        the descriptor tree again.


    """
    # If this descriptor has been bound to a student, return the corresponding
    # XModule. If not, just use the descriptor itself
    try:
        module = getattr(course, '_xmodule', None)
        if not module:
            module = course
    except UndefinedContext:
        module = course

    def possibly_scored(usage_key):
        """Can this XBlock type can have a score or children?"""
        return usage_key.block_type in course.block_types_affecting_grading

    all_descriptors = []
    graded_sections = {}

    def yield_descriptor_descendents(module_descriptor):
        for child in module_descriptor.get_children(usage_key_filter=possibly_scored):
            yield child
            for module_descriptor in yield_descriptor_descendents(child):
                yield module_descriptor

    blocks_stack = [course]
    blocks_dict = {}

    while blocks_stack:
        curr_block = blocks_stack.pop()
        if curr_block.category == grading_type and curr_block.graded:
            xmoduledescriptors = list(yield_descriptor_descendents(curr_block))
            xmoduledescriptors.append(curr_block)

            # The xmoduledescriptors included here are only the ones that have scores.
            block_description = {
                'section_descriptor': curr_block,
                'xmoduledescriptors': [child for child in xmoduledescriptors if child.has_score]
            }

            block_format = curr_block.format if curr_block.format is not None else ''
            graded_sections[block_format] = [block_description] + graded_sections.get(block_format, [])

            all_descriptors.extend(xmoduledescriptors)
            all_descriptors.append(curr_block)
        else:
            children = curr_block.get_children() if curr_block.has_children else []
            # Add this blocks children to the stack so that we can traverse them as well.
            blocks_stack.extend(children)
    return {'graded_sections': graded_sections,
            'all_descriptors': all_descriptors, }


def grade_for_percentage(grade_cutoffs, percentage):
"""
Returns a letter grade as defined in grading_policy (e.g. 'A' 'B' 'C' for 6.002x) or None.

Arguments
- grade_cutoffs is a dictionary mapping a grade to the lowest
possible percentage to earn that grade.
- percentage is the final percent across all problems in a course
"""

letter_grade = None

# Possible grades, sorted in descending order of score
descending_grades = sorted(grade_cutoffs, key=lambda x: grade_cutoffs[x], reverse=True)
for possible_grade in descending_grades:
if percentage >= grade_cutoffs[possible_grade]:
    letter_grade = possible_grade
    break

return letter_grade


def weighted_score(raw_correct, raw_total, weight):
    """Return a tuple that represents the weighted (correct, total) score."""
    # If there is no weighting, or weighting can't be applied, return input.
    if weight is None or raw_total == 0:
        return (raw_correct, raw_total)
    return (float(raw_correct) * weight / raw_total, float(weight))


def get_score(user, problem_descriptor, module_creator, scores_client, submissions_scores_cache, max_scores_cache):
    """
    Return the score for a user on a problem, as a tuple (correct, total).
    e.g. (5,7) if you got 5 out of 7 points.

    If this problem doesn't have a score, or we couldn't load it, returns (None,
    None).

    user: a Student object
    problem_descriptor: an XModuleDescriptor
    scores_client: an initialized ScoresClient
    module_creator: a function that takes a descriptor, and returns the corresponding XModule for this user.
           Can return None if user doesn't have access, or if something else went wrong.
    submissions_scores_cache: A dict of location names to (earned, possible) point tuples.
           If an entry is found in this cache, it takes precedence.
    max_scores_cache: a MaxScoresCache
    """
    submissions_scores_cache = submissions_scores_cache or {}

    if not user.is_authenticated():
        return (None, None)

    location_url = problem_descriptor.location.to_deprecated_string()
    if location_url in submissions_scores_cache:
        return submissions_scores_cache[location_url]

    # some problems have state that is updated independently of interaction
    # with the LMS, so they need to always be scored. (E.g. foldit.)
    if problem_descriptor.always_recalculate_grades:
        problem = module_creator(problem_descriptor)
        if problem is None:
            return (None, None)
        score = problem.get_score()
        if score is not None:
            return (score['score'], score['total'])
        else:
            return (None, None)

    if not problem_descriptor.has_score:
        # These are not problems, and do not have a score
        return (None, None)

    # Check the score that comes from the ScoresClient (out of CSM).
    # If an entry exists and has a total associated with it, we trust that
    # value. This is important for cases where a student might have seen an
    # older version of the problem -- they're still graded on what was possible
    # when they tried the problem, not what it's worth now.
    score = scores_client.get(problem_descriptor.location)
    cached_max_score = max_scores_cache.get(problem_descriptor.location)
    if score and score.total is not None:
        # We have a valid score, just use it.
        correct = score.correct if score.correct is not None else 0.0
        total = score.total
    elif cached_max_score is not None and settings.FEATURES.get("ENABLE_MAX_SCORE_CACHE"):
        # We don't have a valid score entry but we know from our cache what the
        # max possible score is, so they've earned 0.0 / cached_max_score
        correct = 0.0
        total = cached_max_score
    else:
        # This means we don't have a valid score entry and we don't have a
        # cached_max_score on hand. We know they've earned 0.0 points on this,
        # but we need to instantiate the module (i.e. load student state) in
        # order to find out how much it was worth.
        problem = module_creator(problem_descriptor)
        if problem is None:
            return (None, None)

        correct = 0.0
        total = problem.max_score()

        # Problem may be an error module (if something in the problem builder failed)
        # In which case total might be None
        if total is None:
            return (None, None)
        else:
            # add location to the max score cache
            max_scores_cache.set(problem_descriptor.location, total)

    return weighted_score(correct, total, problem_descriptor.weight)
