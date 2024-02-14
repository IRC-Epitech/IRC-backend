const invitationService = require('../services/invitationService');

const createInvitation = async (req, res) => {
    try {
        const { channelId, userIdToInvite } = req.body;
        const invitation = await invitationService.createInvitation({ channelId, userIdToInvite });
        res.status(201).json(invitation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const acceptInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;
        const userId = req.user.id;
        const invitation = await invitationService.acceptInvitation(invitationId, userId);
        res.json(invitation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createInvitation,
    acceptInvitation
};
