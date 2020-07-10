const { sequelize, DataTypes } = require('../db/conn')



const Vehicle_type = sequelize.define('vehicle_type', {
    vt_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    vt_1_5:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    vt_6_10:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    vt_11_24:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    vt_25_48:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    vt_49_72:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    vt_late_percent:{
        type:DataTypes.FLOAT,
        allowNull:false
    }

}, {
    tableName: 'vehicle_type',
    timestamps: false
})

module.exports = Vehicle_type