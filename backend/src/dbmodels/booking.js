const { sequelize, DataTypes } = require('../db/conn')

const Booking = sequelize.define('booking', {
    b_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
	b_date_from: {
        type: DataTypes.DATEONLY,
    },
	b_date_to: {
        type: DataTypes.DATEONLY,
    },
	b_time_from: {
        type: DataTypes.TIME,
    },
	b_time_to: {
        type: DataTypes.TIME,
    },
	b_garage_from: {
        type: DataTypes.INTEGER,
    },
	b_garage_to: {
        type: DataTypes.INTEGER,
    },
	b_car_registration_number: {
        type: DataTypes.STRING,
    },
	b_user_driver_license: {
        type: DataTypes.STRING,
    },
	b_status: {
        type: DataTypes.STRING,
    },
	b_return_condition: {
        type: DataTypes.STRING,
    },
	b_feedback: {
        type: DataTypes.STRING,
    },
	b_actual_return_date: {
        type: DataTypes.DATEONLY,
    } ,
	b_actual_return_time : {
        type: DataTypes.TIME,
    },
	b_payment: {
        type: DataTypes.FLOAT,
    } ,
	b_late_fee : {
        type: DataTypes.FLOAT,
    }

}, {
    tableName: 'booking',
    timestamps: false
})

module.exports = Booking