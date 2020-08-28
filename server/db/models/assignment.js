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
  courseId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  totalPoints: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  percentTotalGrade: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Assignment
