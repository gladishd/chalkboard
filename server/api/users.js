const router = require('express').Router()
const {User, Course, Attendance, Gradebook} = require('../db/models')
const {default: Axios} = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      /* attributes: ['id', 'email', 'accountType'] */
    })
    users ? res.json(users) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/attendance/:courseId', async (req, res, next) => {
  try {
    const data = await Attendance.findAll({
      where: {courseId: req.params.courseId}
    })
    data ? res.json(data) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    user ? res.json(user) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/courses/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    const courses = await user.getCourses()
    courses ? res.json(courses) : res.status(400).end()
  } catch (error) {
    next(error)
  }
})

router.get('/teachers/courses/:teacherId', async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      where: {
        teacherId: req.params.teacherId
      }
    })
    courses ? res.json(courses) : res.status(400).end()
  } catch (error) {
    next(error)
  }
})

router.get('/assignments/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const assignments = await user.getAssignments()
    assignments ? res.json(assignments) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/gradebook/:userId', async (req, res, next) => {
  try {
    const gradeBook = await Gradebook.findAll({
      where: {
        userId: req.params.userId
      }
    })
    gradeBook ? res.json(gradeBook) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    newUser ? res.json(newUser) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.post('/attendance', async (req, res, next) => {
  try {
    const newAttendanceObject = await Attendance.create(req.body)
    newAttendanceObject ? res.json(newAttendanceObject) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const [numUpdated, updatedUsers] = await User.update(req.body, {
      where: {id: req.params.userId},
      returning: true,
      plain: true
    })
    numUpdated ? res.json(updatedUsers[0]) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userDeleted = await User.destroy({
      where: {id: req.params.userId}
    })
    userDeleted ? res.send('user deleted') : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})

router.get('/:user', async (req, res, next) => {
  try {
    const id = req.params.user
    const user = await User.findByPk(id)
    const courses = await user.getCourses()
    res.json(courses)
    console.log('courses ', courses[0].dataValues)
  } catch (err) {
    next(err)
  }
})
