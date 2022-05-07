import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdatper = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdatper, accountMongoRepository)
}
