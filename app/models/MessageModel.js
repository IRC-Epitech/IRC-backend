const mongoose = require('mongoose');
const { Schema } = mongoose;
const { toFrenchTime } = require('../utils/transformDate');


const messageSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
});
messageSchema.methods.getFrenchTimestamp = function() {
    return toFrenchTime(this.timestamp);
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
