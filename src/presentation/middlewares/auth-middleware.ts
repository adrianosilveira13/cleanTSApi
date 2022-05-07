import { LoadAccountByToken } from '@/domain/usecases'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbbiden, reqSuccess, serverError } from '@/presentation/helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return reqSuccess({ accountId: account.id })
        }
      }
      return forbbiden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
