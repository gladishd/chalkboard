require('dotenv').config()

const config = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET
  }
}

const router = require('express').Router()
const {videoToken} = require('../tokens')

module.exports = router

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json')
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  )
}

// GET /api/video/token
router.get('/token', (req, res) => {
  const identity = req.query.identity
  const room = req.query.room
  const token = videoToken(identity, room, config)
  sendTokenResponse(token, res)
})

// POST /api/video/token
router.post('/token', (req, res) => {
  const identity = req.body.identity
  const room = req.body.room
  const token = videoToken(identity, room, config)
  sendTokenResponse(token, res)
})
