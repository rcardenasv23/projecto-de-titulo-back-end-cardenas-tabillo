import { Router } from 'express'
import publicactionController from '../../controllers/publications/app'
import { auth } from '../../functions/app'
import { authVerifyAdmin } from '../../functions/auth'

const route = (router: Router, makeExpressCallback: Function) => {
  // POST
  router.post(
    '/',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.postPublication)
  )
  router.post(
    '/repeat',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.repeatPublication)
  )
  router.post(
    '/file',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.addFile)
  )
  router.post(
    '/stocks',
    makeExpressCallback(publicactionController.getPublicationsStocks)
  )
  router.post(
    '/comment',
    auth.authVerify,
    makeExpressCallback(publicactionController.postComment)
  )

  //GET
  router.get('/', makeExpressCallback(publicactionController.getPublication))
  router.get(
    '/can-comment',
    makeExpressCallback(publicactionController.getCommentPermission)
  )
  router.get(
    '/all',
    makeExpressCallback(publicactionController.getPublications)
  )
  router.get(
    '/all-admin',
    authVerifyAdmin,
    makeExpressCallback(publicactionController.getPublicationsForAdmin)
  )
  router.get(
    '/seller',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.getPublicationsBySeller)
  )
  router.get(
    '/region',
    makeExpressCallback(publicactionController.getPublicationsByRegion)
  )
  router.get('/home', makeExpressCallback(publicactionController.getHomeInfo))

  //PUT
  router.put(
    '',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.patchPublication)
  )
  router.put(
    '/address',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.patchPublicationAddress)
  )
  router.put(
    '/enable',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.openPublication)
  )
  router.put(
    '/disable',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.closePublication)
  )
  router.put(
    '/enable-by-admin',
    auth.authVerifyAdmin,
    makeExpressCallback(publicactionController.openPublicationByAdmin)
  )
  router.put(
    '/disable-by-admin',
    auth.authVerifyAdmin,
    makeExpressCallback(publicactionController.closePublicationByAdmin)
  )

  //DELETE
  router.delete(
    '/file',
    auth.authVerifySeller,
    makeExpressCallback(publicactionController.deleteFile)
  )
  return router
}

export default route
