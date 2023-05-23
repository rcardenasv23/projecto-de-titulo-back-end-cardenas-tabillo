import join from './join'
import sellerDB from '../../data-access/seller/app'
import entity from '../../entities/seller/app'
import getSellerJwt from './get-seller'
import patch from './update-seller'

const joinAsSeller = join(sellerDB, entity.createSeller)
const getSeller = getSellerJwt(sellerDB)
const updateSeller = patch(sellerDB, entity.updateSeller)

const sellerUC = {
  joinAsSeller,
  getSeller,
  updateSeller,
}

export default sellerUC
