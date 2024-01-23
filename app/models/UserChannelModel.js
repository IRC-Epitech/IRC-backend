const mongoose = require('mongoose');
const { Schema } = mongoose;
const { toFrenchTime } = require('../utils/transformDate');


const userChannelSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
    joinedDate: { type: Date, default: Date.now },
});
userChannelSchema.methods.getFrenchJoinedDate = function() {
    return toFrenchTime(this.joinedDate);
};
const UserChannelModel = mongoose.model('UserChannel', userChannelSchema);

module.exports = UserChannelModel;