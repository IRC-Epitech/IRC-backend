const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const url = 'mongodb://localhost:27017/myDatabase';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    password: String,
    createdAt: Date
});

// Message Schema
const messageSchema = new mongoose.Schema({
    messageId: String,
    content: String,
    senderId: String,
    channelId: String,
    createdAt: Date
});

// Channel Schema
const channelSchema = new mongoose.Schema({
    channelId: String,
    name: String,
    members: [String],
    createdAt: Date
});

// Create Models
const UserModel = mongoose.model('User', userSchema);

// Example of how to create a new user
const user = new UserModel({
    userId: '<unique_user_id>',
    username: '<username>',
    email: '<email_address>',
    password: bcrypt.hashSync('<password>', 10),
    createdAt: new Date()
});

user.save()
    .then(() => console.log('User created'))
    .catch(err => console.log(err));
