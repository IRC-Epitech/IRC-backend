const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
    name: String,
    description: String,
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;