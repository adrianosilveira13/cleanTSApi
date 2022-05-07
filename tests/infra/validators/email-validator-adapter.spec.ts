import { EmailValidatorAdapter } from '@/infra/validators'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (email: string): boolean {
    return true
  }
}))

type SutTypes = {
  sut: EmailValidatorAdapter
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter()
  return {
    sut
  }
}

describe('EmailValidatorAdapter', () => {
  it('should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const { sut } = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
