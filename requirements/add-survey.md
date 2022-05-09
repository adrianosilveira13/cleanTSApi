# Create Survey

> ## Success

1. ✅ Receive a **POST** request on **/api/surveys**
2. ✅ Validate if the request belongs to an **admin**
3. ✅ Validate required fields **question** and **answers**
4. ✅ **Create** a survey with provided data
5. ✅ Returns **204**, without data

> ## Exceptions

1. ✅ Returns a **404** error if the API doesn't exist
2. ✅ Returns a **403** error if the user is not an admin
3. ✅ Returns a **400** error if question or answers wasn't provided by the user
4. ✅ Returns a **500** error if create survey returns an error