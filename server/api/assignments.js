const router = require('express').Router()
const {Assignment, Course, User} = require('../db/models')
// const User = require('../db/models/user')
module.exports = router

//Get all assignments
router.get('/', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll()
    assignments ? res.json(assignments) : res.status(400).end()
  } catch (err) {
    next(err)
  }
})

//Create a new assigmetn and assign all user's to it
router.post('/', async (req, res, next) => {
  try {
    console.log('in assign post ', req.body)
    const {courseId} = req.body
    //Creates the assignment
    const newAssignment = await Assignment.create(req.body)

    //Assign the assignment to everyone in the class
    const course = await Course.findByPk(courseId)
    const users = await course.getUsers()

    await Promise.all(
      users.map(user => {
        user.addAssignment(newAssignment)
      })
    )

    newAssignment ? res.json(newAssignment) : res.status(400).end()
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

router.put('/:assignmentId', async (req, res, next) => {
  try {
    const [, updatedAssignments] = await Assignment.update(req.body, {
      where: {id: req.params.assignmentId},
      returning: true,
      plain: true
    })
    res.json(updatedAssignments)
  } catch (err) {
    next(err)
  }
})

router.delete('/:assignmentId', async (req, res, next) => {
  try {
    const assignmentDeleted = await Assignment.destroy({
      where: {id: Number(req.params.assignmentId)}
    })
    assignmentDeleted
      ? res.send('assignment deleted')
      : res.send('deletion failed')
  } catch (err) {
    next(err)
  }
})

//Get all assignments within a class
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

//Get all the users of a particular assignment
router.get('/users/:assignmentId', async (req, res, next) => {
  try {
    const id = Number(req.params.assignmentId)
    const task = await Assignment.findOne({
      where: {
        id
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    task ? res.json(task.users) : res.status(400).end()
  } catch (error) {
    next(error)
  }
})
