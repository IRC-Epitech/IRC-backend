const express = require('express');
const router = express.Router();
const InvitationController = require('../controllers/InvitationController');

// Envoyer une invitation
router.post('/', InvitationController.createInvitation);
router.post('/:invitationId/accept', InvitationController.acceptInvitation);

module.exports = router;
