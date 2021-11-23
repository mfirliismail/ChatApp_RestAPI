'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Conversations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Conversations.hasMany(models.ConversationReply, { foreignKey: "conversationId" })
            Conversations.belongsTo(models.Users, { foreignKey: "userOne" })
            Conversations.belongsTo(models.Users, { foreignKey: "userTwo" })
        }
    };
    Conversations.init({
        userOne: DataTypes.INTEGER,
        userTwo: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Conversations',
    });
    return Conversations;
};