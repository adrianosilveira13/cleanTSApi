import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountColllection = MongoHelper.getCollection('accounts')
    const account = await accountColllection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountColllection = MongoHelper.getCollection('accounts')
    const account = await accountColllection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    }
    )
  }
}
