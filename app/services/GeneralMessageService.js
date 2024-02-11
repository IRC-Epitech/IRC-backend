const Message = require('../models/GeneralMessageModel');

const createMessage = async ({ user, text, timestamp }) => {
    const newMessage = new Message({ user, text, timestamp });
    await newMessage.save();
    return newMessage;
};


const getAllMessages = async () => {
    const messages = await Message.find({});
    return messages;
};

module.exports = {
    createMessage,
    getAllMessages
};
