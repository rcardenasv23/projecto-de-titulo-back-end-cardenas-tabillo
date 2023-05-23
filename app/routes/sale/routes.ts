import { Router } from 'express'
import { auth } from '../../functions/app'
import saleController from '../../controllers/sale/app'

const route = (router: Router, makeExpressCallback: Function) => {
  // POST
  router.post(
    '',
    auth.authVerify,
    makeExpressCallback(saleController.insertSale)
  )
  router.post(
    '/file',
    auth.authVerify,
    makeExpressCallback(saleController.addUserSaleFile)
  )
  router.post(
    '/accept',
    auth.authVerifySeller,
    makeExpressCallback(saleController.completeSale)
  )
  router.post(
    '/reject',
    auth.authVerifySeller,
    makeExpressCallback(saleController.rejectSaleController)
  )

  //GET
  router.get(
    '/by-user',
    auth.authVerify,
    makeExpressCallback(saleController.getUserSales)
  )
  router.get(
    '/by-seller',
    auth.authVerifySeller,
    makeExpressCallback(saleController.getSellerSales)
  )
  router.get(
    '/detail/user',
    auth.authVerify,
    makeExpressCallback(saleController.getSaleDetailUser)
  )
  router.get(
    '/detail/seller',
    auth.authVerifySeller,
    makeExpressCallback(saleController.getSaleDetailSeller)
  )

  //DELETE
  router.delete(
    '/file',
    auth.authVerify,
    makeExpressCallback(saleController.deleteUserSaleFile)
  )
  return router
}

export default route
