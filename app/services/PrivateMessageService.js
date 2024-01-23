const PrivateMessage = require('../models/PrivateMessageModel');

const createPrivateMessage = async (messageData) => {
    const newPrivateMessage = new PrivateMessage(messageData);
    return await newPrivateMessage.save();
};

const getPrivateMessageById = async (messageId) => {
    return PrivateMessage.findById(messageId);
};

const updatePrivateMessage = async (messageId, updateData) => {
    return PrivateMessage.findByIdAndUpdate(messageId, updateData, { new: true });
};

const deletePrivateMessage = async (messageId) => {
    return PrivateMessage.findByIdAndDelete(messageId);
};

const getMessagesFromSenderToReceiver = async (senderId, receiverId) => {
    return PrivateMessage.find({sender: senderId, receiver: receiverId});
};

const postMessagesFromSenderToReceiver = async (senderId, receiverId) => {
    return PrivateMessage.find({sender: senderId, receiver: receiverId});
};
module.exports = {
    createPrivateMessage,
    getPrivateMessageById,
    updatePrivateMessage,
    deletePrivateMessage,
    getMessagesFromSenderToReceiver,
    postMessagesFromSenderToReceiver
};
