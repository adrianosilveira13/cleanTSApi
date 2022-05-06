import { AccountModel } from '@/domain/models/account-model'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.alphaNumeric(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
