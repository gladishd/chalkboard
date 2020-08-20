const router = require('express').Router()
module.exports = router
const { ClassRoom } = require('../db/models')

router.put('/new', async (req, res, next) => {
    try{
    const classDetails = req.body
    const classRoom = await ClassRoom.Create({
        className: classDetails.className,
        classSize: classDetails.size
    })
    res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})