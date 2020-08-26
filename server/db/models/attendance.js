const Sequelize = require('sequelize')
const db = require('../db')

const Assignment = db.define('assignment', {
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  currentDate: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('present', 'absent', 'tardy'),
    allowNull: true // the student might not have yet arrived
  }
})

module.exports = Assignment
