import { AddAccount } from '@/presentation/controllers/login/signup/signup-controller-protocols'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account-model'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { AuthenticationModel } from '@/domain/models/authentication-model'
import faker from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.random.alphaNumeric(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return Promise.resolve(this.authenticationModel)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return Promise.resolve(this.accountModel)
  }
}
