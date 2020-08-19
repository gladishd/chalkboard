const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
  courseName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  videoRoomId: {
    type: Sequelize.STRING
  }
})

module.exports = Course
