const express = require('express');
const router = express.Router();
const PrivateMessageController = require('../controllers/PrivateMessageController');

router.post('/messages', PrivateMessageController.createPrivateMessage);
router.get('/messages/:messageId', PrivateMessageController.getPrivateMessage);
router.put('/messages/:messageId', PrivateMessageController.updatePrivateMessage);
router.delete('/messages/:messageId', PrivateMessageController.deletePrivateMessage);
router.get('/messages/from/:senderId/to/:receiverId', PrivateMessageController.getMessagesFromSenderToReceiver);

module.exports = router;