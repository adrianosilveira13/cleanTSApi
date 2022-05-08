import { LoadAnswersBySurvey } from '@/domain/usecases'
import { LoadSurveyByIdRepository } from '@/data/protocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveyRepository: LoadSurveyByIdRepository) {}
  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    const survey = await this.loadAnswersBySurveyRepository.loadById(id)
    return survey?.answers.map(a => a.answer) || []
  }
}
