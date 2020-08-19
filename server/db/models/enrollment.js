const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = Enrollment
