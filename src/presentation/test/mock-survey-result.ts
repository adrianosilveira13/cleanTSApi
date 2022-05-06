import { SaveSurveyResult } from '@/presentation/controllers/survey-results/save-survey-result/save-survey-result-controller-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-results/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-results/load-survey-result'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return Promise.resolve(this.surveyResultModel)
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  surveyId: string

  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return Promise.resolve(this.surveyResultModel)
  }
}
