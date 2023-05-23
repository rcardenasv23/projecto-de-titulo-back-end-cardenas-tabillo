import conn from '../app'
import Models from '../sequelize/models/index'

import queryCountryData from './query'

const countryDataDb = queryCountryData(conn, Models)

export default countryDataDb
