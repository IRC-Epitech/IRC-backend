const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);