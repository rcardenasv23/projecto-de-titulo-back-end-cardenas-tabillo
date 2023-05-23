import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class PublicationProductState extends Model {}
  PublicationProductState.init(
    {
      id_pubs: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'publication_product_state',
      tableName: 'publication_product_state',
      timestamps: false,
    }
  )
  return PublicationProductState
}
