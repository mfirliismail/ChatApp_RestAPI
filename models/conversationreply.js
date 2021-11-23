'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ConversationReply extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ConversationReply.belongsTo(models.Users, { foreignKey: "userId" })
            ConversationReply.belongsTo(models.Conversations, { foreignKey: "conversationId" })
        }
    };
    ConversationReply.init({
        userId: DataTypes.INTEGER,
        conversationId: DataTypes.INTEGER,
        reply: DataTypes.TEXT,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ConversationReply',
    });
    return ConversationReply;
};