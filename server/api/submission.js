const router = require('express').Router()
const {Submission} = require('../db/models')
const path = require('path')

module.exports = router

console.log('on the submission api page')

router.post('/:assignment', async (req, res, next) => {
    //find body
    let image = req.files.image;  
    image.mv(path.resolve(__dirname,'/Users/zachbryce/senior/chalkboard/public/img',image.name))
    const pic = '/Users/zachbryce/senior/chalkboard/public/img' + image.name
    try{
        await Submission.create({
            studentId: req.query.student,
            assignmentName: req.params.assignment,
            courseId: req.query.course,
            image: image
        })
    } catch (err) {
        console.log(err)
    }
    console.log('sub req files::', req.files.image)
    console.log('req params', req.params)
    console.log('new req query ', req.query)

    // const courseId = req.body.id
    // // const submissions = await Submission.findAll({
    // //     where: {
    // //         courseId: courseId
    // //     }
    // // })
    // // res.json(submissions)
})