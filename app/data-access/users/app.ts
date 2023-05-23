import conn from '../app'
import Models from '../sequelize/models/index'

import queryUser from './query'

const userDb = queryUser(conn, Models)

export default userDb
