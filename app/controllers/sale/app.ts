import insert from './make-sale'
import saleUC from '../../use-cases/sale/app'
import getSaleByUser from './get-sale-by-user'
import getSaleDetailByUser from './get-sale-detail-by-user'
import getSaleDetailBySeller from './get-sale-detail-by-seller'
import insertFile from './insert-sale-file'
import removeFile from './remove-sale-file'
import getSalesBySeller from './get-sale-by-seller'
import finishSale from './complete-sale'
import rejectSale from './reject-sale'

const insertSale = insert(saleUC.insertSale)
const getUserSales = getSaleByUser(saleUC.getSalesByUser)
const getSellerSales = getSalesBySeller(saleUC.getSalesBySeller)
const getSaleDetailUser = getSaleDetailByUser(saleUC.getSaleDetailUser)
const getSaleDetailSeller = getSaleDetailBySeller(saleUC.getSaleDetailSeller)
const addUserSaleFile = insertFile(saleUC.insertUserSaleFile)
const deleteUserSaleFile = removeFile(saleUC.removeUserSaleFile)
const completeSale = finishSale(saleUC.acceptSale)
const rejectSaleController = rejectSale(saleUC.cancelSale)

const saleController = {
  insertSale,
  deleteUserSaleFile,
  completeSale,
  rejectSaleController,
  addUserSaleFile,
  getSaleDetailUser,
  getSaleDetailSeller,
  getUserSales,
  getSellerSales,
}

export default saleController
