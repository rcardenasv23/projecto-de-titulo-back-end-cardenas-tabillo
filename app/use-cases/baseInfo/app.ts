import communesAndRegions from './get-country'
import countryDataDb from '../../data-access/country_data/app'
import attributesDb from '../../data-access/attributes/app'
import getCategories from './get-categories'
import getContentStates from './get-content-states'
import getProductStates from './get-product-states'
import getUnities from './get-unities'
import getAllAtributes from './get-all-attributes'
import updateCategory from './update-category'
import updateUnity from './update-unity'
import updateProductState from './update-product-state'
import createCategory from './create-category'
import createUnity from './create-unity'
import createProductState from './create-product-state'

const countryInfo = communesAndRegions(countryDataDb)
const attributesCategories = getCategories(attributesDb)
const attributesContentStates = getContentStates(attributesDb)
const attributesProductStates = getProductStates(attributesDb)
const attributesUnities = getUnities(attributesDb)
const allAttributes = getAllAtributes(attributesDb)
const patchCategory = updateCategory(attributesDb)
const patchUnity = updateUnity(attributesDb)
const patchProductState = updateProductState(attributesDb)
const insertCategory = createCategory(attributesDb)
const insertUnity = createUnity(attributesDb)
const insertProducState = createProductState(attributesDb)

const baseInfoUC = {
  countryInfo,
  attributesCategories,
  attributesContentStates,
  attributesProductStates,
  attributesUnities,
  allAttributes,
  insertCategory,
  insertUnity,
  insertProducState,
  patchCategory,
  patchUnity,
  patchProductState,
}

export default baseInfoUC
