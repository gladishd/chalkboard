const Sequelize = require('sequelize')
const db = require('../db')



const Submission = db.define('submission', {
  studentId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  assignmentName: {
    // type: Sequelize.ENUM('classwork', 'homework', 'quiz', 'test', 'project'),
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.BLOB
  },
  courseId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Submission
