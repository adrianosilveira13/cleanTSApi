import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { forbbiden, reqSuccess, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbbiden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, httpRequest.accountId)
      return reqSuccess(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
