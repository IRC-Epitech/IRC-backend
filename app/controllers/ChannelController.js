const Channel = require('../models/ChannelModel');

// Créer un canal
exports.createChannel = async (req, res) => {
    try {
        const newChannel = new Channel(req.body);
        await newChannel.save();
        res.status(201).send(newChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Lire un canal
exports.getChannel = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channelId);
        if (!channel) {
            return res.status(404).send();
        }
        res.status(200).send(channel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour un canal
exports.updateChannel = async (req, res) => {
    try {
        const channel = await Channel.findByIdAndUpdate(req.params.channelId, req.body, { new: true });
        if (!channel) {
            return res.status(404).send();
        }
        res.status(200).send(channel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un canal
exports.deleteChannel = async (req, res) => {
    try {
        const channel = await Channel.findByIdAndDelete(req.params.channelId);
        if (!channel) {
            return res.status(404).send();
        }
        res.status(200).send(channel);
    } catch (error) {
        res.status(500).send(error);
    }
};