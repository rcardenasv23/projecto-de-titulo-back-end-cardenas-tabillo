import getCommunesRegions from './get-communes-regions'
import baseInfoUC from '../../use-cases/baseInfo/app'
import getCategories from './get-categories'
import getContentStates from './get-content-states'
import getProductStates from './get-product-states'
import getUnities from './get-unities'
import getPublicationProperties from './get-publicationProperties'
import updateCategory from './update-category'
import updateUnity from './update-unity'
import updateProductState from './update-product-state'
import createCategory from './create-category'
import createUnity from './create-unity'
import createProductState from './create-product-state'

const communesAndRegions = getCommunesRegions(baseInfoUC.countryInfo)
const categories = getCategories(baseInfoUC.attributesCategories)
const contentStates = getContentStates(baseInfoUC.attributesContentStates)
const productStates = getProductStates(baseInfoUC.attributesProductStates)
const unities = getUnities(baseInfoUC.attributesUnities)
const publicactionAttributes = getPublicationProperties(
  baseInfoUC.allAttributes
)
const patchCategory = updateCategory(baseInfoUC.patchCategory)
const patchUnity = updateUnity(baseInfoUC.patchUnity)
const patchProductState = updateProductState(baseInfoUC.patchProductState)
const insertCategory = createCategory(baseInfoUC.insertCategory)
const insertUnity = createUnity(baseInfoUC.insertUnity)
const insertProducState = createProductState(baseInfoUC.insertProducState)

const baseInfoController = {
  communesAndRegions,
  categories,
  contentStates,
  productStates,
  unities,
  publicactionAttributes,
  insertCategory,
  insertUnity,
  insertProducState,
  patchCategory,
  patchUnity,
  patchProductState,
}
export default baseInfoController
