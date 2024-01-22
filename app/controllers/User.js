const User = require('../models/UserModel');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};
