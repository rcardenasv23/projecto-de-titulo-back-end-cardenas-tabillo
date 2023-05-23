import entity from '../../entities/users/app'
import userDb from '../../data-access/users/app'
import userAddressDb from '../../data-access/user_address/app'
import userFilesDb from '../../data-access/user-files/app'
import insert from './insert-user'
import login from './login-user'
import update from './update-user'
import updateUserPassword from './update-user-password'
import updateUserFile from './update-user-file'
import updateUserAddress from './update-user-address'
import deleteUserFile from './delete-file'
import getUser from './get-user'
import passwordRecovery from './passwordRecovery'

const createUser = insert(entity.makeUsers, userDb)
const updateUser = update(entity.updateUser, userDb)
const loginUser = login(entity.loginUsers, userDb)
const updatePassword = updateUserPassword(entity.updateUserPassword, userDb)
const updateAddress = updateUserAddress(entity.patchUserAddress, userAddressDb)
const updateFile = updateUserFile(() => {}, userFilesDb)
const deleteFile = deleteUserFile(userFilesDb)
const getUserByToken = getUser(userDb)
const userPasswordRecovery = passwordRecovery(userDb)

// user use case
const userUC = {
  createUser,
  updateUser,
  loginUser,
  updatePassword,
  updateAddress,
  updateFile,
  deleteFile,
  getUserByToken,
  userPasswordRecovery,
}

export default userUC
