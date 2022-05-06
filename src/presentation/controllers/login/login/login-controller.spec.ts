import { LoginController } from './login-controller'
import { HttpRequest } from './login-controller-protocols'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, reqSuccess, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { mockAuthenticationParams, throwError } from '@/domain/test'
import { faker } from '@faker-js/faker'
import { AuthenticationSpy, ValidationSpy } from '../../survey-results/load-survey-result/load-survey-result-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: mockAuthenticationParams()
})

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authenticationSpy.authenticationParams).toEqual({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.token = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throw', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpReponse = await sut.handle(mockRequest())
    expect(httpReponse).toEqual(reqSuccess({ accessToken: authenticationSpy.token }))
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
