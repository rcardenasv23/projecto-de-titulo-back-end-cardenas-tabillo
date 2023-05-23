import { Router } from 'express'
import sellerController from '../../controllers/sellers/app'
import { auth } from '../../functions/app'

const route = (router: Router, makeExpressCallback: Function) => {
  // POST
  router.post(
    '/join',
    auth.authVerify,
    makeExpressCallback(sellerController.createSeller)
  )

  // PUT
  router.put(
    '',
    auth.authVerifySeller,
    makeExpressCallback(sellerController.updateSeller)
  )

  //GET
  router.get(
    '',
    auth.authVerifySeller,
    makeExpressCallback(sellerController.getSeller)
  )

  return router
}

export default route
