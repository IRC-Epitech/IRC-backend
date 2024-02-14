const Invitation = require('../models/Invitation');
const ChannelModel = require('../models/ChannelModel');

const createInvitation = async ({ channelId, userIdToInvite }) => {
    const invitationExists = await Invitation.findOne({ channelId, userId: userIdToInvite });
    if (invitationExists) {
        throw new Error('Invitation already sent.');
    }
    const invitation = new Invitation({
        channelId,
        userId: userIdToInvite,
        status: 'pending',
    });
    await invitation.save();
    return invitation;
};

const acceptInvitation = async (invitationId, userId) => {
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
        throw new Error('Invitation not found');
    }
    if (invitation.userId.toString() !== userId) {
        throw new Error('Not authorized to accept this invitation');
    }
    invitation.status = 'accepted';
    await invitation.save();

    // Logique pour ajouter l'utilisateur au canal
    const channel = await ChannelModel.findById(invitation.channelId);
    if (!channel.members.includes(userId)) {
        channel.members.push(userId);
        await channel.save();
    }

    return invitation;
};

module.exports = {
    createInvitation,
};
