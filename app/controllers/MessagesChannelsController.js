const MessagesChannelsService = require('../services/MessagesChannelsService');

class MessagesChannelsController {
    async sendChannelMessage(req, res) {
        try {
            const message = await MessagesChannelsService.sendMessage(req.body);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getChannelMessages(req, res) {
        try {
            const channelId = req.params.channelId;
            const messages = await MessagesChannelsService.getChannelMessages(channelId);
            res.json(messages);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new MessagesChannelsController();
