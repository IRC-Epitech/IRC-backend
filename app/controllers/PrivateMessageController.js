const privateMessageService = require('../services/PrivateMessageService');

exports.createPrivateMessage = async (req, res) => {
    try {
        const message = await privateMessageService.createPrivateMessage(req.body);
        res.status(201).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPrivateMessage = async (req, res) => {
    try {
        const message = await privateMessageService.getPrivateMessageById(req.params.messageId);
        if (!message) {
            return res.status(404).send({ message: 'Private message not found' });
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updatePrivateMessage = async (req, res) => {
    try {
        const updatedMessage = await privateMessageService.updatePrivateMessage(req.params.messageId, req.body);
        if (!updatedMessage) {
            return res.status(404).send({ message: 'Private message not found' });
        }
        res.status(200).send(updatedMessage);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deletePrivateMessage = async (req, res) => {
    try {
        const deletedMessage = await privateMessageService.deletePrivateMessage(req.params.messageId);
        if (!deletedMessage) {
            return res.status(404).send({ message: 'Private message not found' });
        }
        res.status(200).send({ message: 'Private message deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getMessagesFromSenderToReceiver = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await privateMessageService.getMessagesFromSenderToReceiver(senderId, receiverId);
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
};
