# Answer to a survey

> ## Success

1. ✅ Receives a **PUT** request on **/api/surveys/{survey_id}/results**
2. ✅ Validate if the request has been made by an **user**
3. ✅ Validate the **survey_id** param
4. ✅ Validate that **answer** field contains a valid answer
5. ✅ **Create** a survey result with provided data it there is any survey result
6. ✅ **Update** a survey result with provided data if it already exists one
7. ✅ Returns **200** with the survey data

> ## Exceptions

1. ✅ Returns a **404** if the API doesn't exists
2. ✅ Returns a **403** if it's not an user
3. ✅ Returns a **403** if the provided user id is invalid
4. ✅ Returns a **403** if the provided answer is invalid
5. ✅ Returns a **500** if something goes wrong when trying to create a survey result
6. ✅ Returns a **500** if something goes wrong when trying to update a survey
7. ✅ Returns a **500** if something goes wrong when trying to load a surveys