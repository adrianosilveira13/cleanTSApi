# SignUp

> ## Success

1. ✅ Receive a **POST** request on **/api/signup**
2. ✅ Validate the required data: **name**, **email**, **password** and **passwordConfirmation**
3. ✅ Validate that **password** and **passwordConfirmation** are the same
4. ✅ Validate that **email** field is a valid email
5. ✅ **Validate** if there is already an user with that email
6. ✅ Generate a **encrypted** passsword (this password can not be decrypted)
7. ✅ **Create** an account for the user with provided data, **replacing** the password by the encrypted one
8. ✅ Generate an access **token** from the user ID
9. ✅ **Update** the user date with the generated token
10. ✅ Returns **200** with an access token and user's name

> ## Exceptions

1. ✅ Returns a **404** if the API doesn't exists
2. ✅ Returns a **400** error if name, email, password and passwordConfirmation are not provided
3. ✅ Returns a **400** error if passowrd and passwordConfirmation are not the same
4. ✅ Returns a **400** if the email field contains an invalid email
5. ✅ Returns a **403** error if the provided email has already been taken
6. ✅ Returns a **500** error if something goes wrong when trying to generate a password
7. ✅ Returns a **500** error if something goes wrong when trying to create a user's account
8. ✅ Returns a **500** error if something goes wrong when trying to generate an access token
9. ✅ Returns a **500** error if something goes wrong when tyring to update the user with the access token