const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const Message = require('./app/models/MessageModel');
const applyRoutes = require('./app/utils/routeUtils');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
applyRoutes(app);

mongoose.connect('mongodb://localhost:27017/IRC')
    .then(() => console.log("Connecté avec succès à MongoDB"))
    .catch(err => console.error("Erreur de connexion MongoDB:", err));


io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('joinRoom', ({ userId, otherUserId }) => {
        const roomId = [userId, otherUserId].sort().join('-');
        socket.join(roomId);
        console.log(userId, otherUserId)
    });

    socket.on('privateMessage', async ({ content, toUserId, fromUserId }) => {
        const roomId = [toUserId, fromUserId].sort().join('-');
        try {
            const newMessage = new Message({ content, user: fromUserId });
            await newMessage.save();
            io.to(roomId).emit('newPrivateMessage', newMessage);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté');
    });
});

http.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
