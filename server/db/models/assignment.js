const Sequelize = require('sequelize')
const db = require('../db')

const Assignment = db.define('assignment', {
  assignmentName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  studentName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  assignmentType: {
    type: Sequelize.ENUM('classwork', 'homework', 'quiz', 'test', 'project'),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  courseId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
})

module.exports = Assignment
