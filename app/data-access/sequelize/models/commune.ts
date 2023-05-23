import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Commune extends Model {}
  Commune.init(
    {
      id_commune: { type: DataTypes.STRING, primaryKey: true },
      id_region: {
        type: DataTypes.STRING,
        references: {
          model: 'region',
          key: 'id_region',
        },
      },
      commune: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'commune',
      tableName: 'commune',
      timestamps: false,
    }
  )
  return Commune
}
