const Message = require('../models/MessageModel');

const createMessage = async (messageData) => {
    const newMessage = new Message(messageData);
    return await newMessage.save();
};

const getMessageById = async (messageId) => {
    return Message.findById(messageId);
};

const updateMessage = async (messageId, updateData) => {
    return Message.findByIdAndUpdate(messageId, updateData, {new: true});
};

const deleteMessage = async (messageId) => {
    return Message.findByIdAndDelete(messageId);
};

module.exports = {
    createMessage,
    getMessageById,
    updateMessage,
    deleteMessage
};
