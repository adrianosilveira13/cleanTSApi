import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account-model'

export interface AddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel>
}
