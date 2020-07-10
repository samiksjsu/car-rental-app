const { sequelize, DataTypes } = require('../db/conn')
const User = sequelize.define('users', {
    u_name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    
    u_email_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    u_password: {
        type: DataTypes.STRING,
        allowNull: false

    }, u_driver_license: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: 10
        }
    },
    u_driver_license_state:{
    type: DataTypes.STRING,
        allowNull: false
    },
    u_street: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    u_zip: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    u_city: {
        type: DataTypes.STRING
    },
    u_state: {
        type: DataTypes.STRING
    },

    u_dob: {
        type: DataTypes.DATE
    },
    u_status: {
        type: DataTypes.STRING
    },
    u_driver_license_photo:{
        type: DataTypes.BLOB
    }

}, {
    tableName: 'users',
    timestamps: false
})

module.exports = User






  
       
        
                