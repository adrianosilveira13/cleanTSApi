import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(HttpRequest.body)
    if (error) return badRequest(error)
    return Promise.resolve(null)
  }
}
