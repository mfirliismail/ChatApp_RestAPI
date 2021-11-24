const router = require('express').Router()
const messageController = require('../controllers/message')
const { authToken } = require('../middlewares/auth')


router.post('/send/:sendId', authToken, messageController.sendMessage)
router.get('/all', authToken, messageController.getAllConversations)
router.get('/user/:partner', authToken, messageController.getAllMessageInOneConversation)


module.exports = router