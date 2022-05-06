import { AddSurvey } from '@/presentation/controllers/survey/add-survey/add-survey-controller-protocols'
import { LoadSurveys } from '@/presentation/controllers/survey/load-surveys/load-surveys-protocols'
import { LoadSurveyById } from '@/presentation/controllers/survey-results/save-survey-result/save-survey-result-controller-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { SurveyModel } from '@/domain/models/survey-model'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return Promise.resolve(this.surveyModels)
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return Promise.resolve(this.surveyModel)
  }
}
