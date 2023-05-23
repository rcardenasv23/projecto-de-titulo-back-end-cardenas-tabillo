import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class FixedAddress extends Model {}
  FixedAddress.init(
    {
      id_address: {
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
      id_region: {
        type: DataTypes.STRING,
        references: {
          model: 'commune',
          key: 'id_region',
        },
      },
      id_commune: {
        type: DataTypes.STRING,
        references: {
          model: 'commune',
          key: 'id_commune',
        },
      },
      address: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.INTEGER, allowNull: true },
      lng: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'publication_address',
      tableName: 'fixed_address',
      timestamps: false,
    }
  )
  return FixedAddress
}
