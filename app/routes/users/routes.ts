import userController from '../../controllers/users/app'
import { Router } from 'express'
import { auth } from '../../functions/app'

const route = (router: Router, makeExpressCallback: Function) => {
  router.post('/', makeExpressCallback(userController.createUser))
  router.post('/recovery', makeExpressCallback(userController.passworRecovery))

  router.get('/', makeExpressCallback(userController.loginUser))
  router.get(
    '/jwt',
    auth.authVerify,
    makeExpressCallback(userController.getUserByToken)
  )

  router.put(
    '/',
    auth.authVerify,
    makeExpressCallback(userController.updateUser)
  )
  router.put(
    '/password',
    auth.authVerify,
    makeExpressCallback(userController.updateUserPassword)
  )
  router.put(
    '/address',
    auth.authVerify,
    makeExpressCallback(userController.updateUserAddress)
  )
  router.put(
    '/file',
    auth.authVerify,
    makeExpressCallback(userController.updateUserFile)
  )

  router.delete(
    '/file',
    auth.authVerify,
    makeExpressCallback(userController.deleteUserFile)
  )

  return router
}

export default route
