const Sequelize = require('sequelize')
const db = require('../db')

const Teacher = db.define('teacher', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }, 
    password: {
        type: Sequelize.STRING,
        // Making `.password` act like a func hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
          return () => this.getDataValue('password')
        }
      },
      salt: {
        type: Sequelize.STRING,
        // Making `.salt` act like a function hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
          return () => this.getDataValue('salt')
        }
      },
      googleId: {
        type: Sequelize.STRING
      }
    })
    
    module.exports = Teacher
    
    /**
     * instanceMethods
     */
    Teacher.prototype.correctPassword = function(candidatePwd) {
      return User.encryptPassword(candidatePwd, this.salt()) === this.password()
    }
    
    /**
     * classMethods
     */
    Teacher.generateSalt = function() {
      return crypto.randomBytes(16).toString('base64')
    }
    
    Teacher.encryptPassword = function(plainText, salt) {
      return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
    }
    
    /**
     * hooks
     */
    const setSaltAndPassword = teacher => {
      if (teacher.changed('password')) {
        teacher.salt = User.generateSalt()
        teacher.password = Teacher.encryptPassword(teacher.password(), teacher.salt())
      }
    }
    
    Teacher.beforeCreate(setSaltAndPassword)
    Teacher.beforeUpdate(setSaltAndPassword)
    Teacher.beforeBulkCreate(teacher => {
      teacher.forEach(setSaltAndPassword)
})
    

