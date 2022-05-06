import { LoadSurveysController } from './load-surveys-controller'
import { noContent, reqSuccess, serverError } from './load-surveys-protocols'
import { throwError } from '@/domain/test'
import { LoadSurveysSpy } from '@/presentation/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controler', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    await sut.handle({})
    expect(loadSurveysSpy.callsCount).toBe(1)
  })

  it('Should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(reqSuccess(loadSurveysSpy.surveyModels))
  })

  it('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModels = []
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
