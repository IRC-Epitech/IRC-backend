const Message = require('../models/MessagesChannels');

class MessagesChannelsService {
    async sendMessage(messageData) {
        try {
            const message = new Message(messageData);
            await message.save();
            return message;
        } catch (error) {
            throw error;
        }
    }

    async getChannelMessages(channelId) {
        try {
            const messages = await Message.find({ channelId }).sort({ timestamp: 1 });
            return messages;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new MessagesChannelsService();
