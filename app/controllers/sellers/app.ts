import insertSeller from './insert-seller'
import sellerUC from '../../use-cases/sellers/app'
import seller from './get-seller'
import update from './update-seller'

const createSeller = insertSeller(sellerUC.joinAsSeller)
const getSeller = seller(sellerUC.getSeller)
const updateSeller = update(sellerUC.updateSeller)
const sellerController = {
  createSeller,
  getSeller,
  updateSeller,
}

export default sellerController
