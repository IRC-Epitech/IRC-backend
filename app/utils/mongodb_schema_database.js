const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const Message = require('../models/MessageModel');
const Channel = require('../models/ChannelModel');
const FileUpload = require('../models/FileUploadModel');
const PrivateMessage = require('../models/PrivateMessageModel');
const UserChannel = require('../models/UserChannelModel');

const url = 'mongodb://localhost:27017/IRC';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const userSchema = new User.schema;
const messageSchema = new Message.schema;
const channelSchema = new Channel.schema;
const fileUploadSchema = new FileUpload.schema;
const privateMessageSchema = new PrivateMessage.schema;
const userChannelSchema = new UserChannel.schema;

// Create Models
const UserModel = mongoose.model('User', userSchema);
const MessageModel = mongoose.model('Message', messageSchema);
const ChannelModel = mongoose.model('Channel', channelSchema);
const FileUploadModel = mongoose.model('FileUpload', fileUploadSchema);
const PrivateMessageModel = mongoose.model('PrivateMessage', privateMessageSchema);
const UserChannelModel = mongoose.model('UserChannel', userChannelSchema);
