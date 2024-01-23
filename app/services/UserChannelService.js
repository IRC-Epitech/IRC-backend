const UserChannel = require('../models/UserChannelModel');

const addUserToChannel = async (userChannelData) => {
    const newUserChannel = new UserChannel(userChannelData);
    return await newUserChannel.save();
};

const getUserChannelById = async (userChannelId) => {
    return UserChannel.findById(userChannelId);
};

const updateUserChannel = async (userChannelId, updateData) => {
    return UserChannel.findByIdAndUpdate(userChannelId, updateData, {new: true});
};

const deleteUserChannel = async (userChannelId) => {
    return UserChannel.findByIdAndDelete(userChannelId);
};

module.exports = {
    addUserToChannel,
    getUserChannelById,
    updateUserChannel,
    deleteUserChannel
};
