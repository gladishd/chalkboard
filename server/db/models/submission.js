const Sequelize = require('sequelize')
const db = require('../db')



const Submission = db.define('submission', {
  studentName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  assignmentType: {
    type: Sequelize.ENUM('classwork', 'homework', 'quiz', 'test', 'project'),
    allowNull: false
  },
  comments: {
    type: Sequelize.TEXT
  },
  courseId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Submission
