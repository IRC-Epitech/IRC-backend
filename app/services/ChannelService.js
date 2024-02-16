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
    // replace channel _id with id
    const { _id, ...rest } = channel._doc;
    return { id: _id, ...rest };
}

async function addMemberToChannel(channelId, userId) {
    // Vérifiez d'abord si l'utilisateur est déjà membre du canal
    const channel = await Channel.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found.');
    }

    // Vérifie si l'utilisateur est déjà dans le tableau des membres
    const isMember = channel.members.some(member => member.equals(userId));
    if (isMember) {
        throw new Error('User is already a member of the channel.');
    }

    // Ajoutez l'utilisateur au tableau des membres
    channel.members.push(userId);
    await channel.save();

    return channel;
}

// Trouver les canaux par ID utilisateur
async function findChannelsByUserId(userId) {
    const channels = await Channel.find({ members: userId });
    // replace all _id with id
    return channels.map(channel => {
        const { _id, ...rest } = channel._doc;
        return { id: _id, ...rest };
    });
}

module.exports = {
    createChannel,
    findChannelsByUserId,
    addMemberToChannel
};
