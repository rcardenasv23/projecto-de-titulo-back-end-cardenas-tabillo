import buy from './buy'
import entity from '../../entities/sale/app'
import saleDB from '../../data-access/sale/app'
import getUserSales from './userSales'
import saleDetailUser from './saleDetailUser'
import saleDetailSeller from './saleDetailSeller'
import saveUserFile from './saveUserFile'
import destroyUserFile from './destroyUserFile'
import getSellerSales from './sellerSales'
import completeSale from './complete-sale'
import rejectSale from './reject-sale'

const insertSale = buy(entity.createSale, saleDB)
const getSalesByUser = getUserSales(saleDB)
const getSalesBySeller = getSellerSales(saleDB)
const getSaleDetailUser = saleDetailUser(saleDB)
const getSaleDetailSeller = saleDetailSeller(saleDB)
const insertUserSaleFile = saveUserFile(entity.creaSaleFile, saleDB)
const removeUserSaleFile = destroyUserFile(saleDB)
const acceptSale = completeSale(saleDB)
const cancelSale = rejectSale(saleDB)

const saleUC = {
  insertSale,
  getSalesBySeller,
  acceptSale,
  cancelSale,
  removeUserSaleFile,
  insertUserSaleFile,
  getSaleDetailUser,
  getSaleDetailSeller,
  getSalesByUser,
}

export default saleUC
