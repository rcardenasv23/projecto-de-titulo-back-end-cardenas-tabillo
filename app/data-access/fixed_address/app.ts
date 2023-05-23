import conn from '../app'
import Models from '../sequelize/models/index'

import queryFixedAddress from './query'

const fixed_address = queryFixedAddress(conn, Models)

export default fixed_address
