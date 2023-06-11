const { Model, DataTypes } = require('sequelize');

const WORK_TABLE = 'works';

class Work extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: WORK_TABLE,
            modelName: 'Work',
            timestamps: true
        }
    }
} 

const WorkSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    item_no: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field:'item_no'
    },
    desc:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'desc'
    },
    unit:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'unit'
    },
    qty:{
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'qty'
    }, 
    rate:{
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'rate'
    },
    amt:{
        allowNull: true,
        type: DataTypes.FLOAT,
        field: 'amt'
    } 
}
  
module.exports = { Work, WorkSchema };

