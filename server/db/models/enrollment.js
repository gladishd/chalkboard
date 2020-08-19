const Sequelize = require('sequelize')

const db = require('../db')

module.exports = Enrollment

const Enrollment = db.define('enrollment', {
  classGrade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  completionStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})
