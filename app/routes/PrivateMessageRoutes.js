const express = require('express');
const router = express.Router();
const PrivateMessageController = require('../controllers/PrivateMessageController');
const authMiddleware = require("../middlewares/Auth");

router.post('/messages', authMiddleware,PrivateMessageController.createPrivateMessage);
router.get('/messages/:messageId',authMiddleware, PrivateMessageController.getPrivateMessage);
router.put('/messages/:messageId',authMiddleware, PrivateMessageController.updatePrivateMessage);
router.delete('/messages/:messageId',authMiddleware, PrivateMessageController.deletePrivateMessage);
router.get('/messages/from/:senderId/to/:receiverId', authMiddleware,PrivateMessageController.getMessagesFromSenderToReceiver);
module.exports = router;