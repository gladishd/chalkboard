const router = require('express').Router()
const {Assignment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll()
    assignments ? res.json(assignments) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/:assignmentId', async (req, res, next) => {
  try {
    const assignment = await Assignment.findByPk(req.params.assignmentId)
    assignment ? res.json(assignment) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.get('/byCourseId/:courseId', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll({
      where: {
        courseId: req.params.courseId
      }
    })
    assignments ? res.json(assignments) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newAssignment = await Assignment.create(req.body)
    newAssignment ? res.json(newAssignment) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:assignmentId', async (req, res, next) => {
  try {
    const [numUpdated, updatedAssignments] = await Assignment.update(req.body, {
      where: {id: req.params.assignmentId},
      returning: true,
      plain: true
    })
    numUpdated ? res.json(updatedAssignments[0]) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:assignmentId', async (req, res, next) => {
  try {
    const assignmentDeleted = await Assignment.destroy({
      where: {id: req.params.assignmentId}
    })
    assignmentDeleted
      ? res.send('assignment deleted')
      : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})
