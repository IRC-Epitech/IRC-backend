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
            return res.status(404).send({message: 'Utilisateur non trouvé'});
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
            return res.status(404).send({message: 'Utilisateur non trouvé'});
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
            return res.status(404).send({message: 'Utilisateur non trouvé'});
        }
        res.status(200).send({message: 'Utilisateur supprimé'});
    } catch (error) {
        res.status(500).send(error);
    }

};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const authPayload = await userService.authenticateUser(email, password);
        res.status(200).json(authPayload);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
};

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.changeUserPassword = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { newPassword } = req.body;
        const updatedUser = await userService.updateUserPassword(userId, newPassword);
        if (!updatedUser) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).send({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.updateUserProfilePicture = async (req, res) => {
    try {
        const userId = req.params.userId;
        // imagePath devrait être l'URL de l'image téléchargée ou un chemin d'accès sur le serveur
        // Supposons que vous avez déjà géré le téléchargement d'image et que vous avez le chemin d'accès
        const imagePath = req.body.imagePath;
        const updatedUser = await userService.updateUserProfilePicture(userId, imagePath);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserPassword(req.params.userId, req.body.password);
        if (!updatedUser) {
            return res.status(404).send({message: 'Utilisateur non trouvé'});
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUserEmail = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserEmail(req.params.userId, req.body.email);
        if (!updatedUser) {
            return res.status(404).send({message: 'Utilisateur non trouvé'});
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUserName = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserName(req.params.userId, req.body.name);
        if (!updatedUser) {
            return res.status(404).send({message: 'Utilisateur non trouvé'});
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.searchUsersByName = async (req, res) => {
    try {
        const searchQuery = req.query.name;
        const users = await userService.searchUsersByName(searchQuery);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
