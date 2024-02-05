require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express(); // Créez une instance unique d'Express
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const applyRoutes = require('./app/utils/routeUtils');
const socketUserService = require('./app/services/socketUserService');
const socketMessageService = require('./app/services/socketMessageService');
const io = require('socket.io')(http, {
    cors: {
        origin: "*", // This should be the URL of your front-end app
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Utilisez l'instance 'app' au lieu de créer une nouvelle instance à chaque fois
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appliquez les routes à l'instance 'app'
applyRoutes(app);

mongoose.connect('mongodb://localhost:27017/IRC')
    .then(() => console.log("Connecté avec succès à MongoDB"))
    .catch(err => console.error("Erreur de connexion MongoDB:", err));

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('setUsername', (username) => {
        // Ajoutez l'utilisateur à la liste des utilisateurs connectés avec son nom d'utilisateur
        connectedUsers.push({
            socketId: socket.id,
            username: username,
        });

        // Ajoutez l'utilisateur à la liste des utilisateurs connectés
        connectedUsers.push({
            socketId: socket.id,
            username: socket.username,
        });

        io.emit('updateUserList', connectedUsers);
        // Services Socket.IO
        socketUserService(io, socket);
        socketMessageService(io, socket);
    });
});

http.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
