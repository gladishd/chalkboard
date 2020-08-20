const router = require('express').Router()
module.exports = router
const { Course } = require('../db/models')


router.post('/create/', async (req, res, next) => {
    try{
     
        const course = req
        console.log('course req ', req.body.name)
        // console.log('api course name ', course)
        // const newCourse = await Course.create({
        //     course
        // })
        
    } catch(err) {
       
        next(err)
    }
})
