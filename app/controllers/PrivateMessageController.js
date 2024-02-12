
const PrivateMessageService = require('../services/PrivateMessageService');

const postMessage = async (req, res) => {
    try {
        const message = await PrivateMessageService.saveMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPrivateMessages = async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await PrivateMessageService.getMessagesBetweenUsers(senderId, receiverId);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postMessage,
    getPrivateMessages,
};
