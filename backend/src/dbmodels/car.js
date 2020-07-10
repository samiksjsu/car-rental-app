const { sequelize, DataTypes } = require('../db/conn')



const Car = sequelize.define('car', {
    c_registration_number:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    c_model:{
        type:DataTypes.STRING,
        allowNull:false
    },
    c_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    c_last_serviced:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    c_number_of_seats:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    c_manufacture_year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    c_mileage:{
        type:DataTypes.STRING,
        allowNull:false
    },
    c_condition:{
        type:DataTypes.STRING,
        allowNull:false
    },
    c_location:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    c_car_photo:{
        type: DataTypes.BLOB,
        allowNull:false
    },
    feature1:{
        type:DataTypes.STRING,
        allowNull:false
    },
    feature2:{
        type:DataTypes.STRING,
        allowNull:false
    },
    feature3:{
        type:DataTypes.STRING,
        allowNull:false
    },
    c_status:{
        type:DataTypes.STRING,
        defaultValue:'Active'
    }  

}, {
    tableName: 'car',
    timestamps: false
})

module.exports = Car