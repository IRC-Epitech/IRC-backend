const express = require('express');
const router = express.Router();
const channelController = require('../controllers/ChannelController');

router.post('/channels', channelController.createChannel);
router.get('/channels/:channelId', channelController.getChannel);
router.put('/channels/:channelId', channelController.updateChannel);
router.delete('/channels/:channelId', channelController.deleteChannel);

module.exports = router;