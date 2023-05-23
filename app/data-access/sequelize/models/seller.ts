import { Sequelize } from 'sequelize/types'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Seller extends Model {}
  Seller.init(
    {
      id_seller: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id_user',
          unique: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      store_name: { type: DataTypes.STRING, allowNull: false },
      rut: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      bank_name: { type: DataTypes.STRING, allowNull: false },
      bank_account_name: { type: DataTypes.STRING, allowNull: false },
      bank_account_type: { type: DataTypes.STRING, allowNull: false },
      bank_account_address: { type: DataTypes.STRING, allowNull: false },
      bank_account_email: { type: DataTypes.STRING, allowNull: false },
      bank_account_rut: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
      sequelize,
      modelName: 'seller',
      tableName: 'seller',
      timestamps: false,
    }
  )
  return Seller
}
