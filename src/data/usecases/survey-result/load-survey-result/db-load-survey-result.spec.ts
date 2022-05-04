import { DbLoadSurveyResult } from './db-load-survey-result'
import {
  LoadSurveyResultRepository,
  mockLoadSurveyResultRepository,
  mockSurveyResultModel,
  mockLoadSurveyByIdRepository,
  throwError,
  LoadSurveyByIdRepository
} from './db-load-survey-result-protocols'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository,
  loadSurveyByIdRepoistoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepoistoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepoistoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepoistoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('Should throw SaveSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load('any_survey_id')
    expect(promise).rejects.toThrow()
  })

  it('Should call LoadSurveyByIdRepoistory if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepoistoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepoistoryStub, 'loadById')
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    await sut.load('any_survey_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  it('Should return surveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
