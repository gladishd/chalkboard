const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/course', require('./course'))
router.use('/class', require('./class'))
router.use('/courses', require('./courses'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
