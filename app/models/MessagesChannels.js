const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    channelId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    senderUsername: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MessagesChannels', messageSchema);
