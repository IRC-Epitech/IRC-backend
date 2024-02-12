const User = require('../models/UserModel');

let io;
connectedUsers = [];


const init = (_io) => {
    io = _io;
    console.log("Socket.io initialisé avec succès");

    io.on('connection', (socket) => {
        console.log(`Un utilisateur est connecté, ID Socket: ${socket.id}`);

        socket.on('joinConnectedUsers', async (userId) => {
            await addConnectUser(userId, socket.id);
        })

        handleGeneralChatMessage(socket);
        handlePrivateMessage(socket);
        emitConnectedUsers();
        attachLogoutListener(socket);
    });
}


// Emit connected users to all clients
const emitConnectedUsers = () => {
    const connectedUsersOnline = connectedUsers.filter(user => user.isOnline)

    // Filtrer les utilisateurs déconnectés si nécessaire, ou les inclure tous
    io.emit('updateUserList', connectedUsersOnline);
    // console.log("emitConnectedUsers", connectedUsersOnline)
}

// Add user in connectedUsers if not already present
const addConnectUser = async (userId, socketId) => { // Ajouter socketId comme paramètre
    let connectedUser = connectedUsers.find(user => user.userId === userId);

    if (!connectedUser) {
        let user = await User.findById(userId);
        connectedUser = {
            userId: userId.toString(),
            username: user?.username || 'Unknown',
            image: 'https://avatars.githubusercontent.com/u/35387401?v=4', // Exemple d'image
            isOnline: true,
            socketId: socketId // Sauvegarder le socketId ici
        };
        connectedUsers.push({...connectedUser});
    } else {
        // Si l'utilisateur existe déjà, mettre à jour son socketId
        connectedUser.socketId = socketId;
    }
};


// Remove user from connectedUsers
const removeConnectedUser = (userId) => {
    const index = connectedUsers.findIndex(user => user.userId === userId);
    if (index !== -1) {
        connectedUsers.splice(index, 1);
        console.log(`Utilisateur supprimé: `, userId);
    }
}


const attachLogoutListener = (socket) => {
    socket.on('logout', (userId) => {
        // Optionnel : Marquez l'utilisateur comme déconnecté sans le supprimer immédiatement
        const connectedUser = connectedUsers.find(user => user.userId === userId);

        if (connectedUser) {
            console.log(`Marquer l'utilisateur comme déconnecté: `, connectedUser.userId);
            connectedUser.isOnline = false;
            removeConnectedUser(connectedUser.userId);
            emitConnectedUsers();
        }
    })
}

const handleGeneralChatMessage = (socket) => {
    /**
     *  Gestion des messages de chat général
     *  payload: { user: { id: string, username: string, email: string }, text: string, timestamp: number }
     */

    socket.on('sendMessage', (payload) => {
        const user = connectedUsers.find(user => user.userId === payload.user.id);

        if (user) {
            console.log(`Message reçu dans le canal général : ${payload.text} de ${user.username}`);

            // Diffuser le message enrichi à tous les clients connectés, y compris l'expéditeur
            io.emit('receiveMessage', payload);
        } else {
            console.log("Utilisateur non trouvé pour l'ID:", payload.userId);
        }
    });
}

const handlePrivateMessage = (socket) => {
    socket.on('sendPrivateMessage', ({ senderId, receiverUsername, text }) => {
        // Trouver le username de l'expéditeur en utilisant senderId
        const sender = connectedUsers.find(user => user.userId === senderId);
        const senderUsername = sender ? sender.username : "Inconnu";

        // Trouver le socketId du destinataire en utilisant receiverUsername
        const receiverSocketId = connectedUsers.find(user => user.username === receiverUsername)?.socketId;
        console.log("Connected users:", connectedUsers);
        console.log("Receiver socketId:", receiverSocketId);

        console.log("Received message payload:", { senderId, senderUsername, receiverUsername, text });

        if (receiverSocketId) {
            // Assurez-vous d'inclure senderUsername dans l'objet émis
            io.to(receiverSocketId).emit('receivePrivateMessage', { senderId, senderUsername, receiverUsername, text });
            console.log(`Message privé envoyé de ${senderUsername} à ${receiverUsername}: ${text}`);
        } else {
            console.log(`Destinataire non trouvé pour le username: ${receiverUsername}`);
        }
    });
}





module.exports = {
    connectedUsers,
    init,
    addConnectUser,
    attachLogoutListener,
    handleGeneralChatMessage,
    handlePrivateMessage

};
