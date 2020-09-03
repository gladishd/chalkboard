const User = require('./user')
const Course = require('./course')
const Assignment = require('./assignment')
const Enrollment = require('./enrollment')
const Gradebook = require('./gradebook')
const Attendance = require('./attendance')
<<<<<<< HEAD
const Submission = require('./submission')
=======
const Group = require('./group')
>>>>>>> b992f7548c86de8b1f596eba548663f1caf5f13b

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
Submission.belongsTo(Course)
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
<<<<<<< HEAD
  Submission
=======
  Group
>>>>>>> b992f7548c86de8b1f596eba548663f1caf5f13b
}
