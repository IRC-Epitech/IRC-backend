const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require("../middlewares/Auth");

router.post('/register', userController.createUser);
router.get('/users/:userId', authMiddleware,userController.getUser);
router.put('/users/:userId', authMiddleware,userController.updateUser);
router.delete('/users/:userId', authMiddleware,userController.deleteUser);
router.post('/login', userController.loginUser);


module.exports = router;
