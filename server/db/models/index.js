const User = require('./user')
const Student = require('./student')
const Teacher = require('./teacher')
const Course = require('./course')
const Assignment = require('./assignment')
const Enrollment = require('./enrollment')
const Gradebook = require('./gradebook')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Teacher.hasMany(Course)
Course.belongsTo(Teacher)

Course.hasMany(Assignment)
Assignment.belongsTo(Course)

Course.belongsToMany(Student, {through: Enrollment})
Student.belongsToMany(Course, {through: Enrollment})

Assignment.belongsToMany(Student, {through: Gradebook})
Student.belongsToMany(Assignment, {through: Gradebook})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
// Teacher.hasMany(ClassRoom)

  module.exports = {
    User,
    Student,
    Teacher,
    Course,
    Assignment,
    Enrollment,
    Gradebook,
    User,
    Teacher,
    ClassRoom
  }
