const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require("../middlewares/Auth");

router.get('/users/search', authMiddleware,userController.searchUsersByName);
router.post('/users/create', userController.createUser);
router.get('/users/:userId', authMiddleware,userController.getUser);
router.put('/users/:userId', authMiddleware,userController.updateUser);
router.delete('/users/:userId', authMiddleware,userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.put('/users/:userId/profile-picture', authMiddleware, userController.updateUserProfilePicture);
router.put('/users/:userId/email', authMiddleware, userController.updateUserEmail);
router.put('/users/:userId/password', authMiddleware, userController.updateUserPassword);



module.exports = router;
