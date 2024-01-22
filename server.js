const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
require('./app/utils/ExportModels'); // Assurez-vous que ce fichier est nécessaire
const applyRoutes = require('./app/utils/routeUtils');

// Middlewares pour le parsing JSON et le parsing des données URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Remplace bodyParser.urlencoded

// Static files
app.use(express.static('public'));

// Appliquez tous les routeurs
applyRoutes(app);

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
    // ... autres gestionnaires d'événements Socket.IO ...
});

// Démarrage du serveur
http.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
