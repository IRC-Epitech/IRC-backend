const Message = require('../models/GeneralMessageModel');

exports.createMessage = async (req, res) => {
    try {
        const { user, text, timestamp } = req.body;
        const newMessage = new Message({ user, text, timestamp });
        await newMessage.save();
        res.status(201).json({ success: true, message: "Message enregistré avec succès.", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement du message.", error: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ timestamp: -1 }); // Récupère tous les messages et les trie par timestamp décroissant
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des messages", error: error.message });
    }
};
