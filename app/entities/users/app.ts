import makeUser from './makeUser'
import loginUser from './loginUser'
import { encrypt } from '../../functions/app'
import updatePassword from './updatePassword'
import makeAddress from './makeAddress'
import patchUser from './patchUser'
import patchAddress from './patchAddress'

const makeUsers = makeUser(encrypt.encryptString)
const loginUsers = loginUser()
const updateUserPassword = updatePassword(encrypt.encryptString)
const makeAddresses = makeAddress()
const updateUser = patchUser()
const patchUserAddress = patchAddress()

const entity = {
  makeUsers,
  patchUserAddress,
  loginUsers,
  updateUserPassword,
  makeAddresses,
  updateUser,
}

export default entity
