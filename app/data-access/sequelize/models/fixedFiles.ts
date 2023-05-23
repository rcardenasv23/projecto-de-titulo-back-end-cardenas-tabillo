import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class PublicationFile extends Model {}
  PublicationFile.init(
    {
      id_file: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_fixed: {
        type: DataTypes.UUID,
        references: {
          model: 'publication',
          key: 'id_fixed',
        },
      },
      url: { type: DataTypes.STRING, allowNull: false },
      extensions: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      width: { type: DataTypes.INTEGER, allowNull: true },
      height: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: 'publication_file',
      tableName: 'fixed_file',
      timestamps: false,
    }
  )
  return PublicationFile
}
