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
x-edx-api-key: EDX-API-KEY-TOKEN
Cache-Control: no-cache
{
    "username": "user55",
    "email": "user55@example.com",
}
```
