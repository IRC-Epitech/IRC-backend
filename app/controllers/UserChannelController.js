const UserChannel = require('../models/UserChannelModel');

// Ajouter un utilisateur à un canal
exports.addUserToChannel = async (req, res) => {
    try {
        const newUserChannel = new UserChannel({
            user: req.body.user,
            channel: req.body.channel,
            joinedDate: req.body.joinedDate || new Date()
        });
        await newUserChannel.save();
        res.status(201).send(newUserChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtenir les détails de UserChannel
exports.getUserChannel = async (req, res) => {
    try {
        const userChannel = await UserChannel.findById(req.params.userChannelId);
        if (!userChannel) {
            return res.status(404).send();
        }
        res.status(200).send(userChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour UserChannel
exports.updateUserChannel = async (req, res) => {
    try {
        const userChannel = await UserChannel.findByIdAndUpdate(req.params.userChannelId, req.body, { new: true });
        if (!userChannel) {
            return res.status(404).send();
        }
        res.status(200).send(userChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un UserChannel
exports.deleteUserChannel = async (req, res) => {
    try {
        const userChannel = await UserChannel.findByIdAndDelete(req.params.userChannelId);
        if (!userChannel) {
            return res.status(404).send();
        }
        res.status(200).send({ message: 'UserChannel deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
