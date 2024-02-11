const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        id: String,
        username: String,
        email: String
    },
    text: String,
    timestamp: Date
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
