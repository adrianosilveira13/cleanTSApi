import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdatper = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdatper, accountMongoRepository)
}
