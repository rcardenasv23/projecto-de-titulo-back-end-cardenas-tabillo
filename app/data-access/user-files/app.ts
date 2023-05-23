import conn from '../app'
import Models from '../sequelize/models/index'

import queryFiles from './query'

const userFilesDb = queryFiles(conn, Models)

export default userFilesDb
