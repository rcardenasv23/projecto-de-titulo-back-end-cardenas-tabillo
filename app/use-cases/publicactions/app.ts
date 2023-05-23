import post from './post'
import entity from '../../entities/publication/app'
import fixedDb from '../../data-access/fixed/app'
import fixedFileDb from '../../data-access/fixed_files/app'
import fixeAddressdDb from '../../data-access/fixed_address/app'
import getPublicationsBySeller from './get-publications-by-seller'
import getPublicationsByRegion from './get-publications-by-region'
import getPublicationById from './get-publication'
import deletePublicationFile from './delete-file'
import addPublicationFile from './add_file'
import updatePublicationInfo from './update-publication'
import updatePublicationAddress from './update-publication-address'
import getPublicationsStock from './get-publications-stock'
import disablePublication from './disable-publication'
import enablePublication from './enable-publication'
import getPublications from './get-all-publications'
import insertComment from './insert-comment'
import commentDb from '../../data-access/comment/app'
import verifyCommentPermission from './verify-comment-permission'
import homeInfo from './home-metrics'
import reActivate from './re-activate'
import disablePublicationByAdmin from './disable-publication-by-admin'
import enablePublicationByAdmin from './open-publication-by-admin'
import getPublicationsForAdmin from './get-all-publications-for-admin'

const postPublicaction = post(fixedDb, entity.createPublication)
const getSellerPublications = getPublicationsBySeller(fixedDb)
const getRegionPublications = getPublicationsByRegion(fixedDb)
const getPublication = getPublicationById(fixedDb)
const deleteFile = deletePublicationFile(fixedFileDb)
const addFile = addPublicationFile(entity.createFiles, fixedFileDb)
const updatePublication = updatePublicationInfo(
  entity.updatePublicationInfo,
  fixedDb
)
const updateAddress = updatePublicationAddress(
  entity.updatePublicationAddress,
  fixeAddressdDb
)
const getPublicationsStocks = getPublicationsStock(fixedDb)
const closePublication = disablePublication(fixedDb)
const closePublicationByAdmmin = disablePublicationByAdmin(fixedDb)
const openPublication = enablePublication(fixedDb)
const openPublicationByAdmin = enablePublicationByAdmin(fixedDb)
const getAllPublications = getPublications(fixedDb)
const postComment = insertComment(commentDb)
const getCommentPermission = verifyCommentPermission(commentDb)
const getHomeInfo = homeInfo(fixedDb)
const repeatPublication = reActivate(fixedDb)
const getAllPublicationsForAdmin = getPublicationsForAdmin(fixedDb)

const publicactionUC = {
  addFile,
  deleteFile,
  getHomeInfo,
  getPublication,
  getAllPublications,
  getAllPublicationsForAdmin,
  updatePublication,
  postPublicaction,
  updateAddress,
  repeatPublication,
  postComment,
  closePublication,
  closePublicationByAdmmin,
  openPublication,
  openPublicationByAdmin,
  getSellerPublications,
  getCommentPermission,
  getRegionPublications,
  getPublicationsStocks,
}

export default publicactionUC
