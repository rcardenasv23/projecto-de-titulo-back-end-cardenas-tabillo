import { Sequelize } from 'sequelize/types'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {}
  User.init(
    {
      id_user: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      is_admin: { type: DataTypes.BOOLEAN, allowNull: true },
      user_name: { type: DataTypes.STRING, allowNull: true },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      user_password: { type: DataTypes.STRING, allowNull: false },
      seller: { type: DataTypes.BOOLEAN, allowNull: false },
      created_at: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'standar_user',
      timestamps: false,
    }
  )
  return User
}
