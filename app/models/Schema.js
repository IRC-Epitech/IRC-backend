
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schéma User
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

// Schéma Message
const messageSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
});

// Schéma Fichier Upload
const fichierUploadSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    filePath: String,
    uploadDate: { type: Date, default: Date.now },
});

// Schéma Channel
const channelSchema = new Schema({
    name: String,
    description: String,
});

// Schéma UserChannel (relation User-Channel)
const userChannelSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
    joinedDate: { type: Date, default: Date.now },
});

// Création des modèles
const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const FichierUpload = mongoose.model('FichierUpload', fichierUploadSchema);
const Channel = mongoose.model('Channel', channelSchema);
const UserChannel = mongoose.model('UserChannel', userChannelSchema);
