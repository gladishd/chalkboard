const router = require('express').Router()
const {Course} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.findAll()
    courses ? res.json(courses) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:courseId', async (req, res, next) => {
  console.log('in my guess')
  try {
    console.log(req.params.courseId)
    const course = await Course.findByPk(req.params.courseId)
    course ? res.json(course) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/students/:courseId', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId)
    const users = await course.getUsers()
    users ? res.json(users) : res.status(400).end()
  } catch (err) {
    next(err) // nice, so since we want to get all courses for both
  } // teachers and students, it will try both routes
})

router.get('/students/:courseId', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId)
    const users = await course.getUsers()
    users ? res.json(users) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCourse = await Course.create(req.body)
    newCourse ? res.json(newCourse) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:courseId', async (req, res, next) => {
  try {
    const [numUpdated, updatedCourses] = await Course.update(req.body, {
      where: {id: req.params.courseId},
      returning: true,
      plain: true
    })
    updatedCourses ? res.json(updatedCourses[0]) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:courseId', async (req, res, next) => {
  try {
    const courseDeleted = await Course.destroy({
      where: {id: req.params.courseId}
    })
    courseDeleted ? res.send('course deleted') : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})

//Below is from old course.js api file

/**
 * const router = require('express').Router()
module.exports = router
const {Course} = require('../db/models')
const {Enrollnent} = require('../db/models/enrollment')
const {User} = require('../db/models')

router.post('/create/', async (req, res, next) => {
  try {
    const course = req.body
    // console.log('api course name ', course)
    const newCourse = await Course.create({
      courseName: course.name,
      size: course.size,
      videoRoomId: course.roomId,
      courseId: course.courseId
    })
    res.json(newCourse)
  } catch (err) {
    next(err)
  }
})

router.get('/myCourses/', async (req, res, next) => {
  const userId = req.user.dataValues.id
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    const courses = await user.getCourses()
    res.json(courses)
  } catch (err) {
    console.log(err)
  }
})
 */
