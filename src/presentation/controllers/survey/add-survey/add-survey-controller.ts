import { badRequest } from '../../../helpers/http/http-helper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(HttpRequest.body)
    if (error) return badRequest(error)
    const { question, answers } = HttpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })
    return null
  }
}
