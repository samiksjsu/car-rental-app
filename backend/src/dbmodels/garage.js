const { sequelize, DataTypes } = require('../db/conn')



const Garage = sequelize.define('garage', {
    g_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    g_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    g_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    g_street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    g_city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    g_state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    g_zip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    g_status: {
        type: DataTypes.STRING
    },
    g_current_capacity: {
        type: DataTypes.INTEGER
    }, g_longitude: {
        type: DataTypes.STRING
    },
    g_latitude: {
        type: DataTypes.STRING
    }

}, {
    tableName: 'garage',
    timestamps: false
})

module.exports = Garage