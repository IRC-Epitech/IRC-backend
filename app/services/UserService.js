const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    return await newUser.save();
};

const getUserById = async (userId) => {
    return User.findById(userId);
};

const updateUser = async (userId, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return User.findByIdAndUpdate(userId, updateData, {new: true});
};

const deleteUser = async (userId) => {
    return User.findByIdAndDelete(userId);
};

const secretKey = process.env.JWT_SECRET;
console.log("Clé secrète JWT :", secretKey);

const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Mot de passe incorrect');
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
    user.token = token;
    await user.save();

    return { token, user };
};
// Obtenir tous les utilisateurs
const getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    authenticateUser,
    getAllUsers
};
