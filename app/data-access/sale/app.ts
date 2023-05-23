import conn from '../app'
import Models from '../sequelize/models/index'

import querySale from './query'

const saleDB = querySale(conn, Models)

export default saleDB
