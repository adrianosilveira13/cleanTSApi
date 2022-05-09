# Survey Result

> ## Success

1. ✅ Receives a **GET** request on **/api/surveys/{survey_id}/results**
2. ✅ Validate if the request has been made by an **user**
3. ✅ Returns **200** with survey data

> ## Exception

1. ✅ Returns a **404** error if the API doesn't exists
2. ✅ Returns a **403** error if it is not an user
3. ✅ Retruns a **500** error if an error occur when trying to list the surveys