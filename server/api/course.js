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
  try {
    const course = await Course.findByPk(req.params.courseId)
    course ? res.json(course) : res.status(400).end()
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
    numUpdated ? res.json(updatedCourses[0]) : res.status(400).end()
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
