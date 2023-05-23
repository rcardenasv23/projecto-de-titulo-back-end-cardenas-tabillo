import insertPublication from './insert-publication'
import publicactionUC from '../../use-cases/publicactions/app'
import sellerPublications from './get-publications-by-seller'
import regionPublications from './get-all-publications-by-region'
import publication from './get-publication'
import deletePublicationFile from './delete-file'
import addPublicationFile from './add-file'
import updatePublication from './update-publication'
import updateAddress from './update-address'
import getPublicationsStock from './get-publications-stock'
import disablePublication from './disable-publication'
import publications from './get-all-publications'
import insertComment from './insert-comment'
import canComment from './can-comment'
import homeInfo from './home-metrics'
import reActivate from './re-activate'
import disableByAdmin from './disableByAdmin'
import enablePublication from './enable-publication'
import enablePublicationByAdmin from './enable-publication-by-admin'
import publicationsForAdmin from './get-all-publications-for-admin'

const postPublication = insertPublication(publicactionUC.postPublicaction)
const getPublicationsBySeller = sellerPublications(
  publicactionUC.getSellerPublications
)
const getPublicationsByRegion = regionPublications(
  publicactionUC.getRegionPublications
)
const getPublication = publication(publicactionUC.getPublication)
const deleteFile = deletePublicationFile(publicactionUC.deleteFile)
const addFile = addPublicationFile(publicactionUC.addFile)
const patchPublication = updatePublication(publicactionUC.updatePublication)
const patchPublicationAddress = updateAddress(publicactionUC.updateAddress)
const getPublicationsStocks = getPublicationsStock(
  publicactionUC.getPublicationsStocks
)
const closePublication = disablePublication(publicactionUC.closePublication)
const closePublicationByAdmin = disableByAdmin(
  publicactionUC.closePublicationByAdmmin
)
const openPublication = enablePublication(publicactionUC.openPublication)
const openPublicationByAdmin = enablePublicationByAdmin(
  publicactionUC.openPublicationByAdmin
)
const getPublications = publications(publicactionUC.getAllPublications)
const getPublicationsForAdmin = publicationsForAdmin(
  publicactionUC.getAllPublicationsForAdmin
)
const postComment = insertComment(publicactionUC.postComment)
const getCommentPermission = canComment(publicactionUC.getCommentPermission)
const getHomeInfo = homeInfo(publicactionUC.getHomeInfo)
const repeatPublication = reActivate(publicactionUC.repeatPublication)

const publicactionController = {
  addFile,
  repeatPublication,
  deleteFile,
  getHomeInfo,
  closePublication,
  closePublicationByAdmin,
  openPublication,
  openPublicationByAdmin,
  patchPublication,
  getPublications,
  getPublicationsForAdmin,
  getCommentPermission,
  patchPublicationAddress,
  postPublication,
  postComment,
  getPublication,
  getPublicationsBySeller,
  getPublicationsByRegion,
  getPublicationsStocks,
}

export default publicactionController
