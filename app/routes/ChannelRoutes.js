const express = require('express');
const ChannelController = require('../controllers/ChannelController');

const router = express.Router();

router.post('/create', ChannelController.createChannel);
router.post('/invite', ChannelController.inviteToChannel);
router.get('/user/:userId', ChannelController.getChannelsByUserId);

// Ajoutez d'autres routes pour les messages, les invitations, etc.

module.exports = router;
