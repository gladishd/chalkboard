const Sequelize = require('sequelize')
const db = require('../db')

const Attendance = db.define('attendance', {
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
    // type: Sequelize.STRING,
    allowNull: true // the student might not have yet arrived.
  }, // We want to give them the benefit of the doubt.
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Attendance
