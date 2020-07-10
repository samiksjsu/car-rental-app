const { sequelize, DataTypes } = require('../db/conn')

const MembershipFee = sequelize.define('membership_fee', {
    m_fee: {
        type: DataTypes.FLOAT,
        primaryKey: true
    }

}, {
    tableName: 'membership_fee',
    timestamps: false
})

module.exports = MembershipFee