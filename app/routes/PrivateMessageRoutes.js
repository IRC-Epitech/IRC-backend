// PrivateMessageRoutes.js
const express = require('express');
const PrivateMessageController = require('../controllers/PrivateMessageController');
const router = express.Router();

// Route pour envoyer un message
router.post('/private-messages', PrivateMessageController.postMessage);

// Route pour récupérer les messages privés entre deux utilisateurs
router.get('/private-messages/:senderId/:receiverId', PrivateMessageController.getPrivateMessages);

module.exports = router;
