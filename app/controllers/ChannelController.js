const Channel = require('../models/ChannelModel');

exports.createChannel = async (req, res) => {
    try {
        const newChannel = new Channel(req.body);
        await newChannel.save();
        res.status(201).send(newChannel);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Ajoutez ici d'autres méthodes comme getChannel, updateChannel, deleteChannel, etc.
