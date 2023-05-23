import conn from '../app'
import Models from '../sequelize/models/index'

import queryFixedFiles from './query'

const fixed_files = queryFixedFiles(conn, Models)

export default fixed_files
