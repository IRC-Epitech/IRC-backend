const userChannelService = require('../services/UserChannelService');

// Ajouter un utilisateur à un canal
exports.addUserToChannel = async (req, res) => {
    try {
        const userChannel = await userChannelService.addUserToChannel(req.body);
        res.status(201).send(userChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtenir une association utilisateur-canal par ID
exports.getUserChannel = async (req, res) => {
    try {
        const userChannel = await userChannelService.getUserChannelById(req.params.userChannelId);
        if (!userChannel) {
            return res.status(404).send({ message: 'UserChannel not found' });
        }
        res.status(200).send(userChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour une association utilisateur-canal
exports.updateUserChannel = async (req, res) => {
    try {
        const updatedUserChannel = await userChannelService.updateUserChannel(req.params.userChannelId, req.body);
        if (!updatedUserChannel) {
            return res.status(404).send({ message: 'UserChannel not found' });
        }
        res.status(200).send(updatedUserChannel);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer une association utilisateur-canal
exports.deleteUserChannel = async (req, res) => {
    try {
        const deletedUserChannel = await userChannelService.deleteUserChannel(req.params.userChannelId);
        if (!deletedUserChannel) {
            return res.status(404).send({ message: 'UserChannel not found' });
        }
        res.status(200).send({ message: 'UserChannel deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
