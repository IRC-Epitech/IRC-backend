const express = require('express');
const ChannelController = require('../controllers/ChannelController');

const router = express.Router();

router.post('/create', ChannelController.createChannel);
router.get('/user/:userId', ChannelController.getChannelsByUserId);
router.put('/:channelId/addMember/:userId', ChannelController.addMemberToChannel);


// Ajoutez d'autres routes pour les messages, les invitations, etc.

module.exports = router;
