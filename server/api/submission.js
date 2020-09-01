const router = require('express').Router()
const {Submission} = require('../db/models')
module.exports = router


router.get('/', async (req, res, next) => {
    //find body
    console.log('sub req ', req)
    // const courseId = req.body.id
    // // const submissions = await Submission.findAll({
    // //     where: {
    // //         courseId: courseId
    // //     }
    // // })
    // // res.json(submissions)
})