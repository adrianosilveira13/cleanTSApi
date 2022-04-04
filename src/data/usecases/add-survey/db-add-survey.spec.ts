import { AddSurveyModel, AddSurveyRepository, DbAddSurvey } from './db-add-survey-protocols'

describe('DbAddSurvey Usecase', () => {
  const makeFakeSurveyData = (): AddSurveyModel => (
    {
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }]
    }
  )
  it('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        return Promise.resolve()
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
