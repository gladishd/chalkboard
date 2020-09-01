const User = require('./user')
const Course = require('./course')
const Assignment = require('./assignment')
const Enrollment = require('./enrollment')
const Gradebook = require('./gradebook')
const Attendance = require('./attendance')
const Submission = require('./submission')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Course.hasMany(Assignment)
Assignment.belongsTo(Course)

Course.belongsToMany(User, {through: Enrollment})
User.belongsToMany(Course, {through: Enrollment})

Assignment.belongsToMany(User, {through: Gradebook})
User.belongsToMany(Assignment, {through: Gradebook})

Course.hasMany(Submission)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
// Teacher.hasMany(ClassRoom)

module.exports = {
  User,
  Course,
  Assignment,
  Enrollment,
  Gradebook,
  Attendance,
  Submission
}
