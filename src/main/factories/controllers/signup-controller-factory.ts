import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers'
import { makeDbAddAccount, makeDbAuthentication, makeLogControllerDecorator, makeSignUpValidation } from '@/main/factories'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
