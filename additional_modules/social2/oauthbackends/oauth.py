from social.backends.facebook import FacebookOAuth2
from social.backends.twitter import TwitterOAuth

class Facebook2OAuth2(FacebookOAuth2):
    name = 'facebook-2'

class Twitter2OAuth(TwitterOAuth):
    name = 'twitter-2'

