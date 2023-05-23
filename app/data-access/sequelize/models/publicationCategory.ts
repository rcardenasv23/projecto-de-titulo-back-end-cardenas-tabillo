import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class PublicationCategory extends Model {}
  PublicationCategory.init(
    {
      id_pubc: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      publication_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'publication_category',
      tableName: 'publication_category',
      timestamps: false,
    }
  )
  return PublicationCategory
}
