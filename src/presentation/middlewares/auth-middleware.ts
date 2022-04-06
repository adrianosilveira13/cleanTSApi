import { AccessDeniedError } from '../errors'
import { forbbiden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(forbbiden(new AccessDeniedError()))
  }
}
