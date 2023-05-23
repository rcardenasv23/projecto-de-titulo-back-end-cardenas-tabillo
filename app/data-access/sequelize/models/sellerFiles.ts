import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class SellerFiles extends Model {}
  SellerFiles.init(
    {
      id_file: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_seller: {
        type: DataTypes.UUID,
        references: {
          model: 'seller',
          key: 'id_seller',
        },
      },
      url: { type: DataTypes.STRING, allowNull: false },
      extensions: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      width: { type: DataTypes.INTEGER, allowNull: true },
      height: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: 'seller_file',
      tableName: 'seller_file',
      timestamps: false,
    }
  )
  return SellerFiles
}
