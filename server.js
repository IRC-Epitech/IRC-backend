const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose'); // Ajout de Mongoose
const PORT = process.env.PORT || 3000;
require('./app/models/Schema');

// Middlewares, par exemple pour le parsing JSON
app.use(express.json());

// Static files
app.use(express.static('public'));

// Import des routes
const router = require('./app/routes');
app.use(router);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/IRC', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion MongoDB:'));
db.once('open', function() {
    console.log("Connecté avec succès à MongoDB");
});

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
