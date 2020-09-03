const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  groupMembers: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Group
