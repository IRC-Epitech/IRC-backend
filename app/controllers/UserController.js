const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const update = req.body;
        if (update.password) {
            update.password = await bcrypt.hash(update.password, 10);
        }
        const user = await User.findByIdAndUpdate(req.params.userId, update, { new: true });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
