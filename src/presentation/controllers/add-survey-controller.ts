import { AddSurvey } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(HttpRequest.body)
      if (error) return badRequest(error)
      const { question, answers } = HttpRequest.body
      await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
