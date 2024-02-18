const express = require('express');
const ChannelController = require('../controllers/ChannelController');

const router = express.Router();

router.post('/create', ChannelController.createChannel);
router.get('/user/:userId', ChannelController.getChannelsByUserId);
router.put('/:channelId/addMember/:userId', ChannelController.addMemberToChannel);
router.delete('/:channelId', ChannelController.deleteChannel);
router.get('/:channelId/members', ChannelController.getMembersByChannelId);
router.get('/', ChannelController.listChannels);


// Ajoutez d'autres routes pour les messages, les invitations, etc.

module.exports = router;
