const messageService = require('../services/messageService');

exports.createMessage = async (req, res) => {
    try {
        const message = await messageService.createMessage(req.body);
        res.status(201).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getMessage = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.messageId);
        if (!message) {
            return res.status(404).send({ message: 'Message not found' });
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await messageService.updateMessage(req.params.messageId, req.body);
        if (!updatedMessage) {
            return res.status(404).send({ message: 'Message not found' });
        }
        res.status(200).send(updatedMessage);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await messageService.deleteMessage(req.params.messageId);
        if (!deletedMessage) {
            return res.status(404).send({ message: 'Message not found' });
        }
        res.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
