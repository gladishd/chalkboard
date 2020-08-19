const Sequelize = require('sequelize')
const db = require('../db')

module.exports = Course

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
