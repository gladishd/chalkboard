const router = require('express').Router()
const {Submission} = require('../db/models')
const path = require('path')
const cloudinary = require('cloudinary').v2;

module.exports = router

console.log('on the submission api page')

router.post('/:assignment', async (req, res, next) => {
    
    let image = req.files.image;  
    console.log('img ', image)
    await cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
        console.log('err ', err)
        console.log('result ', result)
        
        Submission.create({
            studentId: req.query.student,
            assignmentName: req.params.assignment,
            courseId: req.query.course,
            image: result.url
        })
            
       
    })
    // image.mv(path.resolve(__dirname,'/Users/zachbryce/senior/chalkboard/public/img',image.name))
    // const pic = '/Users/zachbryce/senior/chalkboard/public/img' + image.name
    
    
 
})

router.get('/:courseId', async (req, res, next) => {

    try{
        console.log('in sub get api courseId is ', req.params)
        const submissions = await Submission.findAll({
            where: {
                courseId: req.params.courseId
            }
        })
        res.json(submissions)
    }catch(err){
        console.log(err)
    }
})