const User = require('../models/UserModel');
const bcrypt = require("bcrypt");

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

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
