import { LoadSurveys } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, reqSuccess, serverError } from '@/presentation/helpers'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId)
      return surveys.length ? reqSuccess(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string
  }
}
