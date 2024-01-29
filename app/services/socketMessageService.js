const PrivateMessage = require('../models/PrivateMessageModel');

const socketPrivateMessageService = (io, socket) => {
    // Écoute de l'événement pour stocker un message privé
    socket.on('storePrivateMessage', async ({ senderId, receiverId, content }) => {
        try {
            // Création d'une nouvelle instance de message privé
            const message = new PrivateMessage({
                sender: senderId,
                receiver: receiverId,
                content: content
            });

            // Stockage en base de données
            await message.save();

            // Émettre un événement pour informer l'émetteur que le message a été stocké avec succès
            socket.emit('privateMessageStored', message);

            // Émettre un événement pour informer le destinataire du nouveau message privé s'il est connecté
            const receiverSocket = io.sockets.sockets[receiverId];
            if (receiverSocket) {
                receiverSocket.emit('newPrivateMessage', message);
            }
        } catch (error) {
            // Gérer les erreurs si nécessaire
            console.error('Erreur lors du stockage du message privé:', error);
            // Émettre un événement d'erreur à l'émetteur
            socket.emit('privateMessageError', { error: error.message });
        }
    });
};

module.exports = socketPrivateMessageService;