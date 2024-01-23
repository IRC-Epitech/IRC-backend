const Channel = require('../models/ChannelModel');

const createChannel = async (channelData) => {
    const newChannel = new Channel(channelData);
    return newChannel.save();
};

const getChannelById = async (channelId) => {
    return Channel.findById(channelId);
};

const updateChannel = async (channelId, updateData) => {
    return Channel.findByIdAndUpdate(channelId, updateData, {new: true});
};

const deleteChannel = async (channelId) => {
    return Channel.findByIdAndDelete(channelId);
};

module.exports = {
    createChannel,
    getChannelById,
    updateChannel,
    deleteChannel
};
