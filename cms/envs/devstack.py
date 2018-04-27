"""
Specific overrides to the base prod settings to make development easier.
"""

from os.path import abspath, dirname, join

from .aws import *  # pylint: disable=wildcard-import, unused-wildcard-import

# Don't use S3 in devstack, fall back to filesystem
del DEFAULT_FILE_STORAGE
MEDIA_ROOT = "/edx/var/edxapp/uploads"

DEBUG = True
USE_I18N = True
DEFAULT_TEMPLATE_ENGINE['OPTIONS']['debug'] = DEBUG
HTTPS = 'off'

################################ LOGGERS ######################################

import logging

# Disable noisy loggers
for pkg_name in ['track.contexts', 'track.middleware', 'dd.dogapi']:
    logging.getLogger(pkg_name).setLevel(logging.CRITICAL)


################################ EMAIL ########################################

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

################################# LMS INTEGRATION #############################

LMS_BASE = "localhost:8000"
LMS_ROOT_URL = "http://{}".format(LMS_BASE)
FEATURES['PREVIEW_LMS_BASE'] = "preview." + LMS_BASE

########################### PIPELINE #################################

# Skip packaging and optimization in development
PIPELINE_ENABLED = False
STATICFILES_STORAGE = 'openedx.core.storage.DevelopmentStorage'

# Revert to the default set of finders as we don't want the production pipeline
STATICFILES_FINDERS = [
    'openedx.core.djangoapps.theming.finders.ThemeFilesFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

############################ PYFS XBLOCKS SERVICE #############################
# Set configuration for Django pyfilesystem

DJFS = {
    'type': 'osfs',
    'directory_root': 'cms/static/djpyfs',
    'url_root': '/static/djpyfs',
}

################################# CELERY ######################################

# By default don't use a worker, execute tasks as if they were local functions
CELERY_ALWAYS_EAGER = True

################################ DEBUG TOOLBAR ################################
INSTALLED_APPS += ('debug_toolbar', 'debug_toolbar_mongo')
MIDDLEWARE_CLASSES += ('debug_toolbar.middleware.DebugToolbarMiddleware',)
INTERNAL_IPS = ('127.0.0.1',)

DEBUG_TOOLBAR_PANELS = (
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.profiling.ProfilingPanel',
)

DEBUG_TOOLBAR_CONFIG = {
    # Profile panel is incompatible with wrapped views
    # See https://github.com/jazzband/django-debug-toolbar/issues/792
    'DISABLE_PANELS': (
        'debug_toolbar.panels.profiling.ProfilingPanel',
    ),
    'SHOW_TOOLBAR_CALLBACK': 'cms.envs.devstack.should_show_debug_toolbar',
}


def should_show_debug_toolbar(_):
    return True  # We always want the toolbar on devstack regardless of IP, auth, etc.


# To see stacktraces for MongoDB queries, set this to True.
# Stacktraces slow down page loads drastically (for pages with lots of queries).
DEBUG_TOOLBAR_MONGO_STACKTRACES = False


################################ MILESTONES ################################
FEATURES['MILESTONES_APP'] = True


################################ ENTRANCE EXAMS ################################
FEATURES['ENTRANCE_EXAMS'] = True

################################ COURSE LICENSES ################################
FEATURES['LICENSING'] = True
# Needed to enable licensing on video modules
XBLOCK_SETTINGS = {
    "VideoDescriptor": {
        "licensing_enabled": True
    }
}

################################ SEARCH INDEX ################################
FEATURES['ENABLE_COURSEWARE_INDEX'] = True
FEATURES['ENABLE_LIBRARY_INDEX'] = True
SEARCH_ENGINE = "search.elastic.ElasticSearchEngine"

########################## Certificates Web/HTML View #######################
FEATURES['CERTIFICATES_HTML_VIEW'] = True

################################# DJANGO-REQUIRE ###############################

# Whether to run django-require in debug mode.
REQUIRE_DEBUG = DEBUG

########################### OAUTH2 #################################
OAUTH_OIDC_ISSUER = 'http://127.0.0.1:8000/oauth2'

JWT_AUTH.update({
    'JWT_SECRET_KEY': 'lms-secret',
    'JWT_ISSUER': 'http://127.0.0.1:8000/oauth2',
    'JWT_AUDIENCE': 'lms-key',
})

###############################################################################
# See if the developer has any local overrides.
if os.path.isfile(join(dirname(abspath(__file__)), 'private.py')):
    from .private import *  # pylint: disable=import-error,wildcard-import

#####################################################################
# Lastly, run any migrations, if needed.
MODULESTORE = convert_module_store_setting_if_needed(MODULESTORE)

# Dummy secret key for dev
SECRET_KEY = '85920908f28904ed733fe576320db18cabd7b6cd'

# devstack_appsembler.py

from .appsembler import *

ENV_APPSEMBLER_FEATURES = ENV_TOKENS.get('APPSEMBLER_FEATURES', {})
for feature, value in ENV_APPSEMBLER_FEATURES.items():
    APPSEMBLER_FEATURES[feature] = value

#INSTALLED_APPS += ('appsembler',)
DEFAULT_TEMPLATE_ENGINE['OPTIONS']['context_processors'] += ('appsembler.context_processors.intercom',)

CUSTOM_LOGOUT_REDIRECT_URL = ENV_TOKENS.get('CUSTOM_LOGOUT_REDIRECT_URL', '/')

TPA_CLEAN_USERNAMES_KEEP_DOMAIN_PART = ENV_TOKENS.get('TPA_CLEAN_USERNAMES_KEEP_DOMAIN_PART', False)
TPA_CLEAN_USERNAMES_REPLACER_CHAR = ENV_TOKENS.get('TPA_CLEAN_USERNAMES_REPLACER_CHAR', "")
TPA_CLEAN_USERNAMES_ADD_RANDOM_INT = ENV_TOKENS.get('TPA_CLEAN_USERNAMES_ADD_RANDOM_INT', False)

EDX_ORG_COURSE_API_URL = ENV_TOKENS.get('EDX_ORG_COURSE_API_URL', False)
EDX_ORG_COURSE_API_TOKEN_URL = AUTH_TOKENS.get('EDX_ORG_COURSE_API_TOKEN_URL', False)
EDX_ORG_COURSE_API_CLIENT_ID = AUTH_TOKENS.get('EDX_ORG_COURSE_API_CLIENT_ID', False)
EDX_ORG_COURSE_API_CLIENT_SECRET = AUTH_TOKENS.get('EDX_ORG_COURSE_API_CLIENT_SECRET', False)
EDX_ORG_COURSE_API_TOKEN_TYPE = AUTH_TOKENS.get('EDX_ORG_COURSE_API_TOKEN_TYPE', False)
EDX_ORG_COURSE_API_CATALOG_IDS = ENV_TOKENS.get('EDX_ORG_COURSE_API_CATALOG_IDS', False)

if (APPSEMBLER_FEATURES.get('ENABLE_USAGE_TRACKING', False) or
    APPSEMBLER_FEATURES.get('ENABLE_USAGE_AGGREGATION', False)
):
    # enable both apps for either feature flag, because
    #
    # * appsembler_usage depends on souvenirs models
    #
    # * appsembler_usage adds backfill_usage and email_usage management
    #   commands even if the aggregation DB isn't available.
    #
    INSTALLED_APPS += (
        'souvenirs',
        'openedx.core.djangoapps.appsembler.usage',  # appsembler_usage
    )

    if APPSEMBLER_FEATURES.get('ENABLE_USAGE_TRACKING', False):
        # enable live usage tracking via middleware
        MIDDLEWARE_CLASSES += (
            'souvenirs.middleware.SouvenirsMiddleware',
        )

    # router to send aggregation to cloud sql.
    # this should be enabled even if the aggregation DB isn't available,
    # to avoid trying to run migrations or store aggregation data in MySQL.
    DATABASE_ROUTERS += [
        'openedx.core.djangoapps.appsembler.usage.routers.AppsemblerUsageRouter',
    ]

    # appsembler devstack has dummy caches, but souvenirs needs a real cache
    # for rate-limiting writes to DB.
    SOUVENIRS_CACHE_NAME = 'souvenirs'
    CACHES[SOUVENIRS_CACHE_NAME] = {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'souvenirs',
    }

    # operator can override DB auth for migrations
    if ('appsembler_usage' in DATABASES and
        os.environ.get('APPSEMBLER_USAGE_DB_AUTH')
    ):
        _user, _password = os.environ['APPSEMBLER_USAGE_DB_AUTH'].split(':', 1)
        DATABASES['appsembler_usage'].update({
            'USER': _user,
            'PASSWORD': _password,
        })

    # custom reports function to count learners, staff, etc.
    SOUVENIRS_USAGE_REPORTS_FUNCTION = 'openedx.core.djangoapps.appsembler.usage.reports.usage_for_periods'

elif 'appsembler_usage' in DATABASES:
    # if the AppsemblerUsageRouter isn't enabled, then avoid mistakes by
    # removing the database alias
    del DATABASES['appsembler_usage']

CUSTOM_SSO_FIELDS_SYNC = ENV_TOKENS.get('CUSTOM_SSO_FIELDS_SYNC', {})
# to allow to run python-saml with custom port
SP_SAML_RESTRICT_MODE = False
