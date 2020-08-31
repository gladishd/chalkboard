const Sequelize = require('sequelize')
const db = require('../db')

const Gradebook = db.define('gradebook', {
  completed: {
    type: Sequelize.BOOLEAN
    // allowNull: false
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
