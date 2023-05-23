import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class ContentState extends Model {}
  ContentState.init(
    {
      id_state: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'content_state',
      tableName: 'content_state',
      timestamps: false,
    }
  )
  return ContentState
}
