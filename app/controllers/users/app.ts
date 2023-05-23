import userUC from '../../use-cases/users/app'
import insert from './insert-user'
import login from './login-user'
import update from './update-user'
import deleteField from './delete-user-field'
import jwtGet from './get-user'
import recovery from './password-recovery'

const createUser = insert(userUC.createUser)
const loginUser = login(userUC.loginUser)
const updateUser = update(userUC.updateUser)
const updateUserPassword = update(userUC.updatePassword)
const updateUserAddress = update(userUC.updateAddress)
const updateUserFile = update(userUC.updateFile)
const deleteUserFile = deleteField(userUC.deleteFile)
const getUserByToken = jwtGet(userUC.getUserByToken)
const passworRecovery = recovery(userUC.userPasswordRecovery)

const userController = {
  createUser,
  loginUser,
  updateUser,
  updateUserPassword,
  updateUserAddress,
  updateUserFile,
  deleteUserFile,
  getUserByToken,
  passworRecovery,
}

export default userController
