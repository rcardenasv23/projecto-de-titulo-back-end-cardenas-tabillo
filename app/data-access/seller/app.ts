import conn from '../app'
import Models from '../sequelize/models/index'

import querySeller from './query'

const sellerDB = querySeller(conn, Models)

export default sellerDB
