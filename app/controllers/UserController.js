const userService = require('../services/UserService');

// Créer un utilisateur
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtenir un utilisateur par ID
exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.userId, req.body);
        if (!updatedUser) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.userId);
        if (!deletedUser) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).send({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).send(error);
    }
};
