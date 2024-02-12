const express = require('express');
const router = express.Router();
const userChannelController = require('../controllers/UserChannelController');

router.post('/userchannels', userChannelController.addUserToChannel);
router.get('/userchannels/:userChannelId', userChannelController.getUserChannel);
router.put('/userchannels/:userChannelId', userChannelController.updateUserChannel);
router.delete('/userchannels/:userChannelId', userChannelController.deleteUserChannel);

module.exports = router;
