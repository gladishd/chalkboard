const router = require('express').Router()
const {User} = require('../db/models')
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

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    user ? res.json(user) : res.status(400).end()
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
