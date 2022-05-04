import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  forbbiden,
  InvalidParamError
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbbiden(new InvalidParamError('surveyId'))
    }
    return Promise.resolve(null)
  }
}
