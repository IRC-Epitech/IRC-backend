const ChannelService = require('../services/ChannelService');

async function createChannel(req, res) {
    try {
        const channel = await ChannelService.createChannel(req.body);
        res.json(channel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function inviteToChannel(req, res) {
    try {
        // Modifiez pour passer seulement les champs nécessaires
        const { channelId, userIdToInvite } = req.body;
        const channel = await ChannelService.inviteToChannel({ channelId, userIdToInvite });
        res.json(channel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getChannelsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const channels = await ChannelService.findChannelsByUserId(userId);
        res.json(channels);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createChannel,
    inviteToChannel,
    getChannelsByUserId
};
