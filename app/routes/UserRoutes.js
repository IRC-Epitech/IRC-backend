const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require("../middlewares/Auth");

router.post('/users/create', userController.createUser);
router.get('/users/:userId', authMiddleware,userController.getUser);
router.put('/users/:userId', authMiddleware,userController.updateUser);
router.delete('/users/:userId', authMiddleware,userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.put('/users/:userId/profile-picture', authMiddleware, userController.updateUserProfilePicture);
router.put('/users/:userId/password', authMiddleware, userController.changeUserPassword);


module.exports = router;
