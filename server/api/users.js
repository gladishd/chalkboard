const router = require('express').Router()
const {User, Course} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'accountType']
    })
    res.json(users)
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
