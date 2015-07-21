"""
Student progress page
"""
from .course_page import CoursePage


class ProgressPage(CoursePage):
    """
    Student progress page.
    """

    url_path = "progress"

    def is_browser_on_page(self):
        is_present = (
            self.q(css='div.course-info').present and
            self.q(css='div#grade-detail-graph').present
        )
        return is_present

    @property
    def grading_formats(self):
        return [label.replace(' Scores:', '') for label in self.q(css="div.scores h4").text]

    def scores(self, chapter, section, unit):
        """
        Return a list of (points, max_points) tuples representing the scores
        for the section.

        Example:
            scores('Week 1', 'Lesson 1') --> [(2, 4), (0, 1)]

        Returns `None` if no such chapter and section can be found.
        """

        # Find the index of the section in the chapter
        chapter_index = self._chapter_index(chapter)
        if chapter_index is None:
            return None

        section_index = self._section_index(chapter_index, section)
        if section_index is None:
            return None

        unit_index = self._unit_index(chapter_index, section_index, unit)
        if unit_index is None:
            return None

        # Retrieve the scores for the section
        return self._unit_scores(chapter_index, section_index, unit_index)

    def _chapter_index(self, title):
        """
        Return the CSS index of the chapter with `title`.
        Returns `None` if it cannot find such a chapter.
        """
        chapter_css = 'div.chapters section h2'
        chapter_titles = self.q(css=chapter_css).map(lambda el: el.text.lower().strip()).results

        try:
            # CSS indices are 1-indexed, so add one to the list index
            return chapter_titles.index(title.lower()) + 1
        except ValueError:
            self.warning("Could not find chapter '{0}'".format(title))
            return None

    def _section_index(self, chapter_index, title):
        """
        Return the CSS index of the section with `title` in the chapter at `chapter_index`.
        Returns `None` if it can't find such a section.
        """

        # This is a hideous CSS selector that means:
        # Get the links containing the section titles in `chapter_index`.
        # The link text is the section title.
        section_css = 'div.chapters>section:nth-of-type({0}) div.sections div h3 a'.format(chapter_index)
        section_titles = self.q(css=section_css).map(lambda el: el.text.lower().strip()).results

        # The section titles also contain "n of m possible points" on the second line
        # We have to remove this to find the right title
        section_titles = [t.split('\n')[0] for t in section_titles]

        # Some links are blank, so remove them
        section_titles = [t for t in section_titles if t]

        try:
            # CSS indices are 1-indexed, so add one to the list index
            return section_titles.index(title.lower()) + 1
        except ValueError:
            self.warning("Could not find section '{0}'".format(title))
            return None
            return None

    def _unit_index(self, chapter_index, section_index, title):
        """
        Return the CSS index of the unit with `title` in the section at `section_index`
        and the chapter at `chapter_index`.
        Returns `None` if it can't find such a section.
        """

        # This is a hideous CSS selector that means:
        # Get the links containing the unit titles in `section_index`.
        # The link text is the section title.
        unit_css = "{chapter} {section} {unit}".format(
            chapter="div.chapters>section:nth-of-type({})".format(chapter_index),
            section="div.sections>div:nth-of-type({})".format(section_index),
            unit="div.verticals div h4 a",
        )

        unit_titles = self.q(css=unit_css).map(lambda el: el.text.lower().strip()).results

        # The section titles also contain "n of m possible points" on the second line
        # We have to remove this to find the right title
        unit_titles = [t.split('\n')[0] for t in unit_titles]

        # Some links are blank, so remove them
        unit_titles = [t for t in unit_titles if t]

        try:
            # CSS indices are 1-indexed, so add one to the list index
            return unit_titles.index(title.lower()) + 1
        except ValueError:
            self.warning("Could not find unit '{0}'".format(title))
            return None

    def _unit_scores(self, chapter_index, section_index, unit_index):
        """
        Return a list of `(points, max_points)` tuples representing
        the scores in the specified chapter and section.

        `chapter_index`, `section_index` and `unit_index` start at 1.
        """
        # This is CSS selector means:
        # Get the scores for the chapter at `chapter_index`, the section at `section_index`
        # and the unit at `unit_index`
        # Example text of the retrieved elements: "0/1"
        score_css = "{chapter} {section} {unit} {scores}".format(
            chapter="div.chapters>section:nth-of-type({})".format(chapter_index),
            section="div.sections>div:nth-of-type({})".format(section_index),
            unit="div.verticals>div:nth-of-type({})".format(unit_index),
            scores="div.scores>ol>li",
        )

        text_scores = self.q(css=score_css).text

        # Convert text scores to tuples of (points, max_points)
        return [tuple(map(int, score.split('/'))) for score in text_scores]
