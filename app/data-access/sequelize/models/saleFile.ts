import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class SaleFile extends Model {}
  SaleFile.init(
    {
      id_file: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_sale: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'sale',
          key: 'id_sale',
        },
      },
      name: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      extensions: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      width: { type: DataTypes.INTEGER, allowNull: true },
      height: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: 'sale_file',
      tableName: 'sale_file',
      timestamps: false,
    }
  )
  return SaleFile
}
