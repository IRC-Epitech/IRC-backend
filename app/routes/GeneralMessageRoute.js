const express = require('express');
const messageController = require('../controllers/GeneralMessageController');
const router = express.Router();

router.post('/general-messages', messageController.createMessage);
router.get('/general-messages', messageController.getAllMessages);

module.exports = router;
