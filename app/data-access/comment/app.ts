import conn from '../app'
import Models from '../sequelize/models/index'

import queryComment from './query'

const commentDb = queryComment(conn, Models)

export default commentDb
