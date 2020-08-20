const Sequelize = require('sequelize')
const db = require('../db')

const ClassRoom = db.define('classroom', {
  className: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  classSize: {
    type: Sequelize.INTEGER
  }
})

module.exports = ClassRoom
