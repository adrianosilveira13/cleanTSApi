import { Hasher } from '@/data/protocols/cryptography/hasher'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { faker } from '@faker-js/faker'

export class HasherSpy implements Hasher {
  digest = faker.random.alphaNumeric()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.digest)
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (cipherText: string): Promise<string> {
    this.ciphertext = cipherText
    return Promise.resolve(this.plaintext)
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.random.alphaNumeric()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.ciphertext)
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return Promise.resolve(this.isValid)
  }
}
