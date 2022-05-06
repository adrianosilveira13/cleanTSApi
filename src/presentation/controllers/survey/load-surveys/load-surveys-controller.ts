import { Controller, HttpRequest, HttpResponse, LoadSurveys, noContent, reqSuccess, serverError } from './load-surveys-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId)
      return surveys.length ? reqSuccess(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
