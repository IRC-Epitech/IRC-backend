const mongoose = require('mongoose');
const { Schema } = mongoose;


const userChannelSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
    joinedDate: { type: Date, default: Date.now },
});

const UserChannelModel = mongoose.model('UserChannel', userChannelSchema);

module.exports = UserChannelModel;