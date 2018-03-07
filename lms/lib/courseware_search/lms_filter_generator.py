"""
This file contains implementation override of SearchFilterGenerator which will allow
    * Filter by all courses in which the user is enrolled in
"""
import logging

from elasticsearch import exceptions
from search.elastic import (
    ElasticSearchEngine, _process_field_queries, _process_field_filters, _process_filters,
    _process_exclude_dictionary, RESERVED_CHARACTERS, _process_facet_terms, _translate_hits
)
from student.models import CourseEnrollment
from search.filter_generator import SearchFilterGenerator
from openedx.core.djangoapps.user_api.partition_schemes import RandomUserPartitionScheme
from openedx.core.djangoapps.course_groups.partition_scheme import CohortPartitionScheme
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers

INCLUDE_SCHEMES = [CohortPartitionScheme, RandomUserPartitionScheme, ]
SCHEME_SUPPORTS_ASSIGNMENT = [RandomUserPartitionScheme, ]

log = logging.getLogger(__name__)

class LmsSearchFilterGenerator(SearchFilterGenerator):
    """ SearchFilterGenerator for LMS Search """

    _user_enrollments = {}

    def _enrollments_for_user(self, user):
        """ Return the specified user's course enrollments """
        if user not in self._user_enrollments:
            self._user_enrollments[user] = CourseEnrollment.enrollments_for_user(user)
        return self._user_enrollments[user]

    def field_dictionary(self, **kwargs):
        """ add course if provided otherwise add courses in which the user is enrolled in """
        field_dictionary = super(LmsSearchFilterGenerator, self).field_dictionary(**kwargs)
        if not kwargs.get('user'):
            field_dictionary['course'] = []
        elif not kwargs.get('course_id'):
            user_enrollments = self._enrollments_for_user(kwargs['user'])
            field_dictionary['course'] = [unicode(enrollment.course_id) for enrollment in user_enrollments]

        # if we have an org filter, only include results for this org filter
        course_org_filter = configuration_helpers.get_value('course_org_filter')
        if course_org_filter:
            field_dictionary['org'] = course_org_filter

        return field_dictionary

    def exclude_dictionary(self, **kwargs):
        """
            Exclude any courses defined outside the current org.
        """
        exclude_dictionary = super(LmsSearchFilterGenerator, self).exclude_dictionary(**kwargs)
        course_org_filter = configuration_helpers.get_value('course_org_filter')
        # If we have a course filter we are ensuring that we only get those courses above
        if not course_org_filter:
            org_filter_out_set = configuration_helpers.get_all_orgs()
            if org_filter_out_set:
                exclude_dictionary['org'] = list(org_filter_out_set)

        return exclude_dictionary


class ElasticSearchEngineCustom(ElasticSearchEngine):

    def search(self,
               query_string=None,
               field_dictionary=None,
               filter_dictionary=None,
               exclude_dictionary=None,
               facet_terms=None,
               exclude_ids=None,
               use_field_match=False,
               **kwargs):  # pylint: disable=too-many-arguments, too-many-locals, too-many-branches

        log.debug("searching index with %s", query_string)
        elastic_queries = []
        elastic_filters = []

        # We have a query string, search all fields for matching text within the "content" node
        if query_string:
            elastic_queries.append({
                "query_string": {
                    "fields": ["content.*"],
                    "query": query_string.encode('utf-8').translate(None, RESERVED_CHARACTERS)
                }
            })

        if field_dictionary:
            if use_field_match:
                elastic_queries.extend(_process_field_queries(field_dictionary))
            else:
                elastic_filters.extend(_process_field_filters(field_dictionary))

        if filter_dictionary:
            elastic_filters.extend(_process_filters(filter_dictionary))

        # Support deprecated argument of exclude_ids
        if exclude_ids:
            if not exclude_dictionary:
                exclude_dictionary = {}
            if "_id" not in exclude_dictionary:
                exclude_dictionary["_id"] = []
            exclude_dictionary["_id"].extend(exclude_ids)

        if exclude_dictionary:
            elastic_filters.append(_process_exclude_dictionary(exclude_dictionary))

        query_segment = {
            "match_all": {}
        }
        if elastic_queries:
            query_segment = {
                "bool": {
                    "must": elastic_queries
                }
            }

        query = query_segment
        if elastic_filters:
            filter_segment = {
                "bool": {
                    "must": elastic_filters
                }
            }
            query = {
                "filtered": {
                    "query": query_segment,
                    "filter": filter_segment,
                }
            }

        body = {
            "query": query,
            "sort": {"start_date": {"order": "desc"}}
        }
        if facet_terms:
            facet_query = _process_facet_terms(facet_terms)
            if facet_query:
                body["facets"] = facet_query

        try:
            es_response = self._es.search(
                index=self.index_name,
                body=body,
                **kwargs
            )
        except exceptions.ElasticsearchException as ex:
            # log information and re-raise
            log.exception("error while searching index - %s", ex.message)
            raise

        return _translate_hits(es_response)
