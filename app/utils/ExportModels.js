const User = require('../models/UserModel');
const Message = require('../models/PrivateMessageModel');
const FileUpload = require('../models/FileUploadModel');
const Channel = require('../models/ChannelModel');
const UserChannel = require('../models/UserChannelModel');

module.exports = {
    User,
    Message,
    FileUpload,
    Channel,
    UserChannel
};
