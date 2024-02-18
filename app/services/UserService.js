const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SocketManager = require('../../app/utils/socketManager');
const FakeService = require("./FakeService");

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const imageUrl =  FakeService.generateDiceBearURL(userData.username, 'fun-emoji');
    const newUser = new User({ ...userData, imageUrl, password: hashedPassword });
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

    await SocketManager.addConnectUser(user._id.toString());

    // delete user.password;
    const userSerialized = {
        id: user._id,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
    }

    return { token, user: userSerialized };
};
// Obtenir tous les utilisateurs
const getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw error;
    }
};

const updateUserProfilePicture = async (userId, imagePath) => {
    return User.findByIdAndUpdate(userId, { profilePicture: imagePath }, { new: true });
};
const updateUserEmail = async (userId, newEmail) => {
    return User.findByIdAndUpdate(userId, { email: newEmail }, { new: true });
};

const updateUserPassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
};
const updateUserName = async (userId, newName) => {
    return User.findByIdAndUpdate(userId, { username: newName }, { new: true });
};

const searchUsersByName = async (name) => {
    if (!name) throw new Error('Le nom de recherche est requis');

    // Utilisez une expression régulière pour une recherche insensible à la casse et partielle
    const searchPattern = new RegExp(name, 'i');
    return User.find({ username: { $regex: searchPattern } });
};


module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    authenticateUser,
    getAllUsers,
    updateUserProfilePicture,
    updateUserPassword,
    updateUserName,
    updateUserEmail,
    searchUsersByName
};
