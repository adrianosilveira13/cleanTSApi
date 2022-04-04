import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(HttpRequest.body)
    return Promise.resolve(null)
  }
}
