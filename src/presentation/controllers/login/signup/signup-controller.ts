import { AddAccount, Authentication, Controller, HttpRequest, HttpResponse, Validation } from './signup-controller-protocols'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbbiden, reqSuccess, serverError } from '@/presentation/helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) return forbbiden(new EmailInUseError())

      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      return reqSuccess(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
