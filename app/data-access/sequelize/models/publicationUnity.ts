import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class PublicationUnity extends Model {}
  PublicationUnity.init(
    {
      id_unity: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      publication_unity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'publication_unity',
      tableName: 'publication_unity',
      timestamps: false,
    }
  )
  return PublicationUnity
}
