const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
  teacherId: {
    type: Sequelize.INTEGER
  },
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
  },
<<<<<<< HEAD
  courseId: {
    type: Sequelize.STRING,
    defaultValue: ''
=======
  courseIntro: {
    type: Sequelize.TEXT
  },
  courseMoreInformation: {
    type: Sequelize.TEXT
>>>>>>> f8b9fbfcbf72c117fa1508d232fab3043cb3b0da
  }
})

module.exports = Course
