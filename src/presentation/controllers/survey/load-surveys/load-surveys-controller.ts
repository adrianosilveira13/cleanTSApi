import { Controller, HttpRequest, HttpResponse, LoadSurveys, reqSuccess, serverError } from './load-surveys-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return reqSuccess(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
