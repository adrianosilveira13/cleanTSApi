# List Surveys

> ## Success

1. ✅ Receives a **GET** request on **/api/surveys**
2. ✅ Validate if the request has been made by a **user**
3. ✅ Returns **204** if there is no survey
4. ✅ Returns **200** with survey data

> ## Exception

1. ✅ Returns a **404** error if the API doesn't exists
2. ✅ Returns a **403** error if it is not an user
3. ✅ Retruns a **500** error if an error occur when trying to list the surveys