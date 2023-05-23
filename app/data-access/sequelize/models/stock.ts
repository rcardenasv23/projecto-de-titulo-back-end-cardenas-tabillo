import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Stock extends Model {}
  Stock.init(
    {
      id_stock: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_sale: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'sale',
          key: 'id_sale',
        },
      },
      id_fixed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'fixed',
          key: 'id_fixed',
        },
      },
      stock_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'content_state',
          key: 'id_state',
        },
      },
    },
    {
      sequelize,
      modelName: 'stock',
      tableName: 'stock',
      timestamps: false,
    }
  )
  return Stock
}
