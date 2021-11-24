const router = require('express').Router()
const messageController = require('../controllers/message')
const { authToken } = require('../middlewares/auth')


router.post('/send/:sendId', authToken, messageController.sendMessage)


module.exports = router