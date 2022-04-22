import app from '../config/app'
import request from 'supertest'

describe('Survey Routes', () => {
  describe('PUT /surveys/:surveyId/results', () => {
    it('Should return 403 on add save survey result without access token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
