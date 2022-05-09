# Login

> ## Success

1. ✅ Receives a **POST** request on **/api/login**
2. ✅ Validate required data **email** and **password**
3. ✅ Validate if the **email** contains a valid email
4. ✅ **Search** a user with the provided email and password
5. ✅ Generate a **token** from the user ID
6. ✅ **Update** the user date with the generated token
7. ✅ Retruns **200** with an accessToken and user's name

> ## Exception

1. ✅ Returns a **404** error if the API doesn't exists
2. ✅ Returns a **400** error if the user doesn't provide email and password
3. ✅ Returns a **400** error if an invalid email is provided
4. ✅ Returns a **401** error if there's no user with such data
5. ✅ Returns a **500** error if something goes wrong when trying to generate an access token
6. ✅ Returns a **500** error if something goes wrong when trying to update the user with the access token previously generated