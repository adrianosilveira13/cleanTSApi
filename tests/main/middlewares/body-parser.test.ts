import { setupApp } from '@/main/config/app'
import request from 'supertest'
import { Express } from 'express'

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  it('Should parse body as JSON', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Adriano' })
      .expect({ name: 'Adriano' })
  })
})
