import { AddSurvey } from '@/presentation/controllers/survey/add-survey/add-survey-controller-protocols'
import { LoadSurveys } from '@/presentation/controllers/survey/load-surveys/load-surveys-protocols'
import { LoadSurveyById } from '@/presentation/controllers/survey-results/save-survey-result/save-survey-result-controller-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { SurveyModel } from '@/domain/models/survey-model'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdStub()
}
