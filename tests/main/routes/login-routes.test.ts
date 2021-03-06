import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/db'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import { Express } from 'express'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Adriano',
          email: 'adriano@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Adriano',
        email: 'adriano@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'adriano@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    it('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'adriano@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
