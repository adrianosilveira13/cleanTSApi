import { LoadSurveyResult } from '@/domain/usecases'
import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepoistory: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Result> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepoistory.loadById(surveyId)
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, {
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }))
      }
    }
    return surveyResult
  }
}
