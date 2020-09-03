const Sequelize = require('sequelize')
const db = require('../db')

const Gradebook = db.define('gradebook', {
  status: {
    type: Sequelize.ENUM('completed', 'late', 'excused', 'pending'),
    defaultValue: 'pending'
  },
  individualGrade: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  }
})

module.exports = Gradebook
