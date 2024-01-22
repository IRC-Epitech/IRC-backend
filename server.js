const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// Middlewares, par exemple pour le parsing JSON
app.use(express.json());

// Static files
app.use(express.static('public'));

// Import des routes
const router = require('./app/routes');
app.use(router);

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté');
    });

    // Vous pouvez ajouter d'autres gestionnaires d'événements Socket.IO ici
});

// Démarrage du serveur
http.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
