# OSPP API

## Authentication
The API requires EDX API KEY is added to the request HEADER

THe endpoint returns the following response error if there is a
problem with the authentication process:

### Credentials not provided
* Code: 401 UNAUTHORIZED
* Content: `{detail: "Authentication credentials were not provided."}`
* Reason: Authentication credentials were not provided.

## User endpoints

### Create New User

This endpoint creates a new edX user.

* URL: `/ospp_api/v0/create_user`
* Method: `POST`
* HEADER
    * Required
        * 'x-edx-api-key'
* Data Params
    * Required:
        * 'username'
        * 'email'
        * 'name_id' # is the user_id from the Auth0 user profile
    * Optional
        * 'first_name'
        * 'last_name'

* Success Response
    * Code: 200
    * Content:
```
{
    "user_id ": 65, # the id of the new user
}
```
* Error Responses:
    * Code: 400
    * Content: `{"user_message": "Wrong parameters on user creation"}`
    * Reason: Wrong parameters on user creation

    * Code: 409
    * Content: `{"user_message": "User already exists"}`
    * Reason: User already exists

* Example call:
```
POST /ospp_api/v0/create_user
Host: example.com
Content-Type: application/json
x-edx-api-key: {EDX-API-KEY-TOKEN}
Cache-Control: no-cache
{
    "username": "user55",
    "email": "user55@example.com",
    "name_id": "auth0|5a1827996asd85k0cb994082"
    "first_name": "Test",
    "last_name": "User",
}
```

### Create enrollment

* URL: `/ospp_api/v0/course_enrollments`
* Method: `POST`
* HEADER
    * Required
        * 'x-edx-api-key'
* Data Params
    * Required:
        * 'user_id'
        * 'course_details'
            * 'course_id'
    * Optional:
        * is_active default - true
        * mode default - audit
        * eligibility_status default - false
        * partner_logo default - ''
        
* Success Response
    * Code: 200
    * Content:
```
{
  "created": "2017-12-01T15:32:14.767504Z",
  "mode": "honor",
  "is_active": true,
  "course_details": {
    "course_id": "course-v1:Rom+RM1+2015",
    "course_name": "Tor",
    "enrollment_start": null,
    "enrollment_end": null,
    "course_start": "2015-01-01T00:00:00Z",
    "course_end": null,
    "invite_only": false,
    "course_modes": [
      {
        "slug": "honor",
        "name": "Honor Certificate",
        "min_price": 0,
        "suggested_prices": "",
        "currency": "usd",
        "expiration_datetime": null,
        "description": null,
        "sku": "8812E4C",
        "bulk_sku": null
      },
      {
        "slug": "verified",
        "name": "Verified Certificate",
        "min_price": 100,
        "suggested_prices": "",
        "currency": "usd",
        "expiration_datetime": "2018-01-10T00:00:00Z",
        "description": null,
        "sku": "4CDEA2A",
        "bulk_sku": null
      }
    ]
  },
  "user": "Honor12"
}
```
* Error Responses:
     * Code: 400 if the request is not valid
     * Code: 406 if an account with the given user id not found
* Example call:
```
POST /ospp_api/v0/course_enrollments
Host: example.com
Content-Type: application/json
x-edx-api-key: {EDX-API-KEY-TOKEN}
Cache-Control: no-cache
{
  "user_id": "16",
  "is_active": true,
  "eligibility_status": ture,
  "partner_logo": "https://pbs.twimg.com/profile_images/596777148435705856/tsE4inUQ.jpg"
  "course_details": {
    "course_id": "course-v1:Rom+RM1+2015"
  }
} 
```
