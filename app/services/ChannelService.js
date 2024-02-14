const Channel = require('../models/ChannelModel');
const User = require('../models/UserModel'); // Assurez-vous d'avoir un modèle utilisateur
/*
* @param name - string
* @param createdBy - string
* @param members - array string
* */
async function createChannel({ name, createdBy, members }) {
    const existingChannel = await Channel.findOne({ name });
    if (existingChannel) {
        throw new Error('Channel name already exists.');
    }

    const imageUrl = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
    const channel = await Channel.create({
        name,
        createdBy,
        members,
        imageUrl,
    });

    return channel;
}

async function inviteToChannel({ channelId, userIdToInvite }) {
    const channel = await Channel.findById(channelId);
    if (!channel) {
        throw new Error('Channel does not exist.');
    }

    // Pas de vérification d'autorisation, on ajoute directement l'utilisateur
    if (!channel.members.includes(userIdToInvite)) {
        channel.members.push(userIdToInvite);
        await channel.save();
    }

    return channel;
}

// Trouver les canaux par ID utilisateur
async function findChannelsByUserId(userId) {
    return Channel.find({ members: userId });
}

module.exports = {
    createChannel,
    inviteToChannel,
    findChannelsByUserId
};
