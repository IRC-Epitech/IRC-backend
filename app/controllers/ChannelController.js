const ChannelService = require('../services/ChannelService');

async function createChannel(req, res) {
    try {
        const channel = await ChannelService.createChannel(req.body);
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

async function addMemberToChannel(req, res) {
    try {
        const { channelId, userId } = req.params;
        const updatedChannel = await ChannelService.addMemberToChannel(channelId, userId);
        res.json(updatedChannel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        await ChannelService.deleteChannel(channelId);
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMembersByChannelId = async (req, res) => {
    try {
        const channelId = req.params.channelId;
        if (!channelId) {
            return res.status(400).json({ message: "Channel ID is required" });
        }

        const members = await ChannelService.getMembersByChannelId(channelId);
        if (members.length === 0) {
            return res.status(404).json({ message: "No members found in this channel" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listChannels = async (req, res) => {
    try {
        const filter = req.query.filter;
        const channels = await ChannelService.listChannels(filter);
        res.json(channels);
    } catch (error) {
        console.error('Error in listChannels Controller:', error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    createChannel,
    getChannelsByUserId,
    addMemberToChannel,
    deleteChannel,
    getMembersByChannelId,
    listChannels
};
