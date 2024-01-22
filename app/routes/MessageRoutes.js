const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');

router.post('/messages', messageController.createMessage);
router.get('/messages/:messageId', messageController.getMessage);
router.put('/messages/:messageId', messageController.updateMessage);
router.delete('/messages/:messageId', messageController.deleteMessage);

module.exports = router;