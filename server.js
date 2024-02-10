require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const applyRoutes = require('./app/utils/routeUtils');
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Importez la classe SocketManager
const SocketManager = require('./app/utils/socketManager');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

applyRoutes(app);

mongoose.connect('mongodb://127.0.0.1:27017/IRC')
    .then(() => console.log("Connecté avec succès à MongoDB"))
    .catch(err => console.error("Erreur de connexion MongoDB:", err));

// Utilisez SocketManager pour gérer les connexions socket
SocketManager.init(io);

http.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
