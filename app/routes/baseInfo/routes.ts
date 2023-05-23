import { Router } from 'express'
import baseInfoController from '../../controllers/baseInfo/app'
import { auth } from '../../functions/app'

const route = (router: Router, makeExpressCallback: Function) => {
  router.post(
    '/category',
    auth.authVerifyAdmin,
    makeExpressCallback(baseInfoController.insertCategory)
  )
  router.post(
    '/unity',
    auth.authVerifyAdmin,
    makeExpressCallback(baseInfoController.insertUnity)
  )
  router.post(
    '/product-state',
    auth.authVerifyAdmin,
    makeExpressCallback(baseInfoController.insertProducState)
  )

  router.get(
    '/country',
    makeExpressCallback(baseInfoController.communesAndRegions)
  )
  router.get('/category', makeExpressCallback(baseInfoController.categories))
  router.get('/unity', makeExpressCallback(baseInfoController.unities))
  router.get(
    '/content-state',
    makeExpressCallback(baseInfoController.contentStates)
  )
  router.get(
    '/product-state',
    makeExpressCallback(baseInfoController.productStates)
  )
  router.get(
    '/publication-properties',
    makeExpressCallback(baseInfoController.publicactionAttributes)
  )

  router.put(
    '/category',
    auth.authVerifyAdmin,
    makeExpressCallback(baseInfoController.patchCategory)
  )
  router.put(
    '/unity',
    auth.authVerifyAdmin,
    makeExpressCallback(baseInfoController.patchUnity)
  )
  router.put(
    '/product-state',
    auth.authVerifyAdmin,
    makeExpressCallback(baseInfoController.patchProductState)
  )
  return router
}

export default route
