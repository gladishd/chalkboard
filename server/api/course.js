const router = require('express').Router()
module.exports = router
const {Course} = require('../db/models')

router.post('/create/', async (req, res, next) => {
  try {
    const course = req.body
    // console.log('api course name ', course)
    const newCourse = await Course.create({
      courseName: course.courseName,
      size: course.courseSize,
      videoRoomId: course.roomId,
      courseId: course.courseId,
      courseIntro: course.introCourseText,
      courseMoreInformation: course.moreClassInformationText
    })
    res.json(newCourse)
  } catch (err) {
    next(err)
  }
})
