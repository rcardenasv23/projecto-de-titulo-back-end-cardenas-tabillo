import conn from '../app'
import Models from '../sequelize/models/index'

import queryAttributes from './query'

const attributesDb = queryAttributes(conn, Models)

export default attributesDb
