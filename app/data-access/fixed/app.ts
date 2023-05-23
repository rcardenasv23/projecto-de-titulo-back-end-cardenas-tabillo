import conn from '../app'
import Models from '../sequelize/models/index'

import queryFixed from './query'

const fixedDb = queryFixed(conn, Models)

export default fixedDb
