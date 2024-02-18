const Channel = require('../models/ChannelModel');
const User = require('../models/UserModel');
const {Types} = require("mongoose");
const FakeService = require("./FakeService"); // Assurez-vous d'avoir un modèle utilisateur
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

    const imageUrl = FakeService.generateDiceBearURL(name, 'initials')
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

const deleteChannel = async (channelId) => {
    try {
        const deletedChannel = await Channel.findByIdAndDelete(channelId);
        if (!deletedChannel) {
            throw new Error('Channel not found');
        }
        return deletedChannel;
    } catch (error) {
        // Gérer les erreurs (par exemple, canal non trouvé, problème de base de données, etc.)
        throw error;
    }
};

getMembersByChannelId = async (channelId) => {
    const channel = await Channel.findById(channelId);
    if (!channel) {
        throw new Error('Channel not found');
    }
    // Assurez-vous que channel.members est un tableau d'ObjectId ou de chaînes
    const members = await User.find({ '_id': { $in: channel.members } });
    return members;
};

listChannels = async (filter) => {
    const query = {};
    if (filter) {
        query.name = { $regex: filter, $options: 'i' }; // Recherche insensible à la casse
    }
    return Channel.find(query);
};

module.exports = {
    createChannel,
    findChannelsByUserId,
    addMemberToChannel,
    deleteChannel,
    getMembersByChannelId,
    listChannels

};
