const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('', '', '', {
    host: '',
    dialect: ''
  });

  sequelize.authenticate().then(() => {
      console.log('Successfully connected to database')
  }).catch((e) => {
      console.log('Unsuccessful Connection', e)
  })

  module.exports = {
      Sequelize,
      DataTypes,
      sequelize
  }