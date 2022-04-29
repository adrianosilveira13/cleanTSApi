import { loginPath, surveyPath, signUpPath, surveyResultPath } from './paths/'

export default {
  '/login': loginPath,
  '/surveys': surveyPath,
  '/signup': signUpPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
