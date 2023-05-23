import { Sequelize } from 'sequelize'

const { Model } = require('sequelize')

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Comment extends Model {}
  Comment.init(
    {
      id_comment: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id_user',
        },
      },
      id_fixed: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'publication',
          key: 'id_fixed',
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'comment',
      tableName: 'comment',
      timestamps: false,
    }
  )
  return Comment
}
