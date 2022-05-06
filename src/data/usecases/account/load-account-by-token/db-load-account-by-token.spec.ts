import { DbLoadAccountByToken } from './db-load-account-by-token'
import { throwError } from '@/domain/test'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '../../survey-result/load-survey-result/db-load-survey-result-protocols'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.random.alphaNumeric()
    role = faker.random.word()
  })

  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  it('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load(token, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  it('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.accountModel = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  it('Should return an account on sucess', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })

  it('Should throw if Decrypter throw', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if LoadAccountByTokenRepository throw', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })
})
