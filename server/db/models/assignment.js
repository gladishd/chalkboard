const Sequelize = require('sequelize')
const db = require('../db')

const Assignment = db.define('assignment', {
  assignmentName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  assignmentType: {
    type: Sequelize.ENUM('classwork', 'homework', 'quiz', 'test', 'project'),
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Assignment
