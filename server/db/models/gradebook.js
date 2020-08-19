const Sequelize = require('sequelize')
const db = require('../db')

module.exports = Gradebook

const Gradebook = db.define('gradebook', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  individualGrade: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  }
})
