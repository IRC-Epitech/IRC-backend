require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express(); // Créez une instance unique d'Express
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const applyRoutes = require('./app/utils/routeUtils');
const socketUserService = require('./app/services/socketUserService');
const socketMessageService = require('./app/services/socketMessageService');



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

    // Services Socket.IO
    socketUserService(io, socket);
    socketMessageService(io, socket);
});

http.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
