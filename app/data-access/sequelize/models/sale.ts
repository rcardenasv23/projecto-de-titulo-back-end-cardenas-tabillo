import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Sale extends Model {}
  Sale.init(
    {
      id_sale: {
        type: DataTypes.UUID,
        primaryKey: true,
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
      id_seller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'seller',
          key: 'id_seller',
        },
      },
      fixeds: { type: DataTypes.JSON, allowNull: false },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: { type: DataTypes.STRING, allowNull: true },
      sale_state: { type: DataTypes.UUID, allowNull: false },
      date_pickup: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'sale',
      tableName: 'sale',
      timestamps: false,
    }
  )
  return Sale
}
