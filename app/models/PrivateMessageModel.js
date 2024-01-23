const mongoose = require('mongoose');
const { Schema } = mongoose;

const privateMessageSchema = new Schema({
    content: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' }, // ID de l'utilisateur qui envoie le message
    receiver: { type: Schema.Types.ObjectId, ref: 'User' }, // ID de l'utilisateur qui reçoit le message
    timestamp: { type: Date, default: Date.now },
    channelId: { type: Schema.Types.ObjectId, ref: 'Channel' }, // Optionnel : ID du canal
});

const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);
module.exports = PrivateMessage;
