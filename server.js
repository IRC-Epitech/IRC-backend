const express = require('express');
const http = require('http').createServer(express());
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const applyRoutes = require('./app/utils/routeUtils');
const socketUserService = require('./app/services/socketUserService');
const socketMessageService = require('./app/services/socketMessageService');

express().use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'));

applyRoutes(express());

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
