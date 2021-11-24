const { Users, Conversations, ConversationReply } = require('../models')
const { Op } = require('sequelize')
const joi = require('joi')


module.exports = {
    sendMessage: async(req, res) => {
        const body = req.body
        const sendId = req.params.sendId
        const userId = req.user.id
        try {

            const Schema = joi.object({
                reply: joi.string().required()
            })
            const { error } = Schema.validate({...body }, { abortEarly: false })
            if (error) {
                return res.status(400).json({
                    status: "failed",
                    errors: error['details'].map(
                        ({ message }) => message
                    )
                })
            }


            const findUser = await Users.findOne({
                where: {
                    id: sendId
                }
            })
            if (!findUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "user not found"
                })
            }

            const checkConver = await Conversations.findOne({
                where: {
                    [Op.or]: [{
                        userOne: userId,
                        userTwo: sendId
                    }, {
                        userOne: sendId,
                        userTwo: userId
                    }]
                }
            })

            if (checkConver) {
                const createReply = await ConversationReply.create({
                    userId: userId,
                    conversationId: checkConver.dataValues.id,
                    reply: body.reply,
                    status: "unread"
                })
                if (!createReply) {
                    return res.status(400).json({
                        status: "failed",
                        message: "failed send a message"
                    })
                }
                return res.status(200).json({
                    status: "success",
                    message: "success send message",
                    data: createReply
                })
            } else {
                const createConver = await Conversations.create({
                    userOne: userId,
                    userTwo: sendId
                })
                if (!createConver) {
                    return res.status(400).json({
                        status: "failed",
                        message: "failed send a message"
                    })
                }
                const createReply = await ConversationReply.create({
                    userId: userId,
                    conversationId: createConver.dataValues.id,
                    reply: body.reply,
                    status: "unread"
                })
                return res.status(200).json({
                    status: "success",
                    message: "success send a message"
                })
            }

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getAllConversations: async(req, res) => {
        const userId = req.user.id
        try {
            const findAllConversations = await Conversations.findAll({
                where: {
                    [Op.or]: [{
                        userOne: userId
                    }, {
                        userTwo: userId
                    }]
                },
                order: [
                    ['createdAt', 'DESC'],
                ]
            })
            if (!findAllConversations) {
                return res.status(400).json({
                    status: "failed",
                    message: "you are not have conversations yet"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findAllConversations
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },
    getAllMessageInOneConversation: async(req, res) => {
        const userId = req.user.id
        const partner = req.params.partner

        try {
            const checkConver = await Conversations.findOne({
                where: {
                    [Op.or]: [{
                        userOne: userId,
                        userTwo: partner
                    }, {
                        userOne: partner,
                        userTwo: userId
                    }]
                },
            })

            if (!checkConver) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot find conversation"
                })
            }

            const findAllMessage = await ConversationReply.findAll({
                where: {
                    conversationId: checkConver.dataValues.id
                },
                include: {
                    model: Users,
                    attributes: ["id", "fullname", "email"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ]
            })

            return res.status(200).json({
                status: "success",
                message: "success retrieved data",
                data: findAllMessage
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}