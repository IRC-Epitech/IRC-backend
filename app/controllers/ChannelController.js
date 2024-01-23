const channelService = require('../services/ChannelService');

exports.createChannel = async (req, res) => {
    try {
        const channel = await channelService.createChannel(req.body);
        res.status(201).send(channel);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getChannel = async (req, res) => {
    try {
        const channel = await channelService.getChannelById(req.params.channelId);
        if (!channel) {
            return res.status(404).send({ message: 'Channel not found' });
        }
        res.status(200).send(channel);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateChannel = async (req, res) => {
    try {
        const channel = await channelService.updateChannel(req.params.channelId, req.body);
        if (!channel) {
            return res.status(404).send({ message: 'Channel not found' });
        }
        res.status(200).send(channel);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteChannel = async (req, res) => {
    try {
        const channel = await channelService.deleteChannel(req.params.channelId);
        if (!channel) {
            return res.status(404).send({ message: 'Channel not found' });
        }
        res.status(200).send({ message: 'Channel deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
