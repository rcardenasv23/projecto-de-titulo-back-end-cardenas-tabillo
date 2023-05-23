import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Fixed extends Model {}
  Fixed.init(
    {
      id_fixed: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_seller: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'seller',
          key: 'id_seller',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dimentions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      current_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.UUID,
        references: {
          model: 'publication_category',
          key: 'id_pubc',
        },
      },
      product_state: {
        type: DataTypes.UUID,
        references: {
          model: 'publication_product_state',
          key: 'id_pubs',
        },
      },
      unity: {
        type: DataTypes.UUID,
        references: {
          model: 'publication_unity',
          key: 'id_unity',
        },
      },
      closed_by_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      content_state: {
        type: DataTypes.UUID,
        references: {
          model: 'content_state',
          key: 'id_state',
        },
      },
      created_at: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {
      sequelize,
      modelName: 'publication',
      tableName: 'fixed',
      timestamps: false,
    }
  )
  return Fixed
}
