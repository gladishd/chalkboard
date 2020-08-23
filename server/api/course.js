const router = require('express').Router()
module.exports = router
const { Course } = require('../db/models')
const { Enrollnent } = require('../db/models/enrollment')
const { User } = require('../db/models')

router.post('/create/', async (req, res, next) => {
    try{
     
        
        const course = req.body
        // console.log('api course name ', course)
        const newCourse = await Course.create({
            courseName: course.name,
            size: course.size,
            videoRoomId: course.roomId,
            courseId: course.courseId
        })
        res.json(newCourse)
    } catch(err) {
       
        next(err)
    }
})

router.get('/myCourses/', async (req, res, next) => {
    const userId = req.body.id
    console.log('this req ', req.user.data)
    try{
        // const user = await User.findOne({
        //     where: {
        //         id: userId
        //     }
        // })
        // console.log('first try user ', user)
        // // const courses = user.getCourses()
        // console.log('final res ', courses)
    }catch(err) {
        console.log(err)
    }
})
