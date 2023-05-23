import {Sequelize} from "sequelize";

const { Model } = require('sequelize')

module.exports = (sequelize:Sequelize, DataTypes:any) => {
    class Region extends Model {
    }
    Region.init(
        {
            id_region: {type: DataTypes.STRING, primaryKey: true},
            region:{type:DataTypes.STRING, allowNull: false}
        },
        {
            sequelize,
            modelName: 'region',
            tableName: 'region',
            timestamps: false
        }
    )
    return Region;
}