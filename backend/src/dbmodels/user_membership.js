const { sequelize, DataTypes } = require('../db/conn')



const UserMembership = sequelize.define('user_membership', {
    um_user_driver_license: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    start_date: {
        type: DataTypes.DATEONLY
    },
    valid_till: {
        type: DataTypes.DATEONLY
    },
    renewed_on: {
        type: DataTypes.DATEONLY
    },
    amount: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'user_membership',
    timestamps: false
})

module.exports = UserMembership