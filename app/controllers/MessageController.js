const Message = require('../models/MessageModel');

// Créer un message
exports.createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).send(newMessage);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Lire un message
exports.getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId).populate('user');
        if (!message) {
            return res.status(404).send();
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour un message
exports.updateMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.messageId, req.body, { new: true });
        if (!message) {
            return res.status(404).send();
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.messageId);
        if (!message) {
            return res.status(404).send();
        }
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
};
