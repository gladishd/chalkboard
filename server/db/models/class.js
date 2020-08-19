const Sequelize = require('sequelize')
const db = require('../db')


const ClassRoom = db.define('class', {
    className: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    classSize: {
        type: Sequelize.INTEGER
    } 
    //video tbd based off twilio
})

module.exports = ClassRoom
