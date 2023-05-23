import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class UserFiles extends Model {}
  UserFiles.init(
    {
      id_file: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id_user',
        },
      },
      url: { type: DataTypes.STRING, allowNull: false },
      extensions: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      width: { type: DataTypes.INTEGER, allowNull: true },
      height: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: 'user_file',
      tableName: 'user_file',
      timestamps: false,
    }
  )
  return UserFiles
}
