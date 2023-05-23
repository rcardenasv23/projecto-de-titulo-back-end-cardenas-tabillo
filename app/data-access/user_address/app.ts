import conn from '../app';
import Models from '../sequelize/models/index';

import queryUserAddress from './query';

const userAddressDb = queryUserAddress(conn, Models);

export default userAddressDb;