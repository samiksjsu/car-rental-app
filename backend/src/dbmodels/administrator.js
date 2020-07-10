const { sequelize, DataTypes } = require('../db/conn')



const Administrator = sequelize.define('administrator', {
    a_email_id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    a_name:{
        type:DataTypes.STRING
    },
    a_password:{
        type:DataTypes.STRING
    },
    a_status:{
        type:DataTypes.STRING
    }

}, {
    tableName: 'administrator',
    timestamps: false
})

module.exports = Administrator