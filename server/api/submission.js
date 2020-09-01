const router = require('express').Router()
const {Submission} = require('../db/models')
module.exports = router

console.log('on the submission api page')

router.post('/', async (req, res, next) => {
    //find body
    console.log('sub req all', req.body)

    // const courseId = req.body.id
    // // const submissions = await Submission.findAll({
    // //     where: {
    // //         courseId: courseId
    // //     }
    // // })
    // // res.json(submissions)
})