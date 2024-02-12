// PrivateMessageService.js
const PrivateMessage = require('../models/PrivateMessageModel');

const saveMessage = async (messageData) => {
    const message = new PrivateMessage(messageData);
    try {
        return await message.save();
    } catch (error) {
        throw error;
    }
};

const getMessagesBetweenUsers = async (senderId, receiverId) => {
    try {
        return await PrivateMessage.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    saveMessage,
    getMessagesBetweenUsers,
};
