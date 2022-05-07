import { DbAddSurvey } from '@/data/usecases'
import { SurveyMongoRepository } from '@/infra/db'
import { AddSurvey } from '@/domain/usecases'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
