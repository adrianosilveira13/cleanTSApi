import { DbLoadSurveyResult } from './db-load-survey-result'
import {
  LoadSurveyResultRepositorySpy,
  throwError,
  LoadSurveyByIdRepositorySpy
} from './db-load-survey-result-protocols'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy,
  loadSurveyByIdRepoistorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const loadSurveyByIdRepoistorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepoistorySpy)
  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepoistorySpy
  }
}

let surveyId: string

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.random.alphaNumeric()
  })

  it('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load(surveyId)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyId)
  })

  it('Should throw SaveSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load(surveyId)
    expect(promise).rejects.toThrow()
  })

  it('Should call LoadSurveyByIdRepoistory if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepoistorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    await sut.load(surveyId)
    expect(loadSurveyByIdRepoistorySpy.id).toBe(surveyId)
  })

  it('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepoistorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    const surveyResult = await sut.load(surveyId)
    const { surveyModel } = loadSurveyByIdRepoistorySpy
    expect(surveyResult).toEqual({
      surveyId: surveyModel.id,
      question: surveyModel.question,
      date: surveyModel.date,
      answers: surveyModel.answers.map(answer => Object.assign({}, answer, {
        count: 0,
        percent: 0
      }))
    })
  })

  it('Should return surveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.load(surveyId)
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })
})
