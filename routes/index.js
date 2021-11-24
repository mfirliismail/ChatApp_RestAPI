const router = require('express').Router()
const userRoute = require('./users')
const messageRoute = require('./message')

router.use('/users', userRoute)
router.use('/message', messageRoute)

module.exports = router