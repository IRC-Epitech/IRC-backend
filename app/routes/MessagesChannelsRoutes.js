
const express = require('express');
const router = express.Router();
const MessagesChannelsController = require('../controllers/MessagesChannelsController');

router.post('/messages-channels/send', MessagesChannelsController.sendChannelMessage);
router.get('/messages-channels/:channelId', MessagesChannelsController.getChannelMessages);

module.exports = router;
