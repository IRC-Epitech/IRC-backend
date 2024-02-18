const User = require('../models/UserModel');
const { v4: uuidv4 } = require('uuid');

let io;
connectedUsers = [];
let channels = {};
let channelInvitations = {};


const init = (_io) => {
    io = _io;
    console.log("Socket.io initialisé avec succès");

    io.on('connection', (socket) => {
        console.log(`Un utilisateur est connecté, ID Socket: ${socket.id}`);

        socket.on('joinConnectedUsers', async (userId) => {
            console.log("joinConnectedUsers", userId)
            await addConnectUser(userId, socket.id);
        })

        handleGeneralChatMessage(socket);
        handlePrivateMessage(socket);
        emitConnectedUsers();
        attachLogoutListener(socket);
        handleChannelMessage(socket);
        handleCreateChannel(socket);
        addUserToChannel(socket);
        joinChannel(socket);
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

    // console.log("INTO", {
    //     connectedUser,
    //     userId,
    //     socketId
    // })

    if (!connectedUser) {
        let user = await User.findById(userId);


        // console.log("add user", {
        //     user,
        //     userId,
        //     socketId
        // })

        connectedUser = {
            userId: userId.toString(),
            username: user?.username || 'Unknown',
            imageUrl: user?.imageUrl,
            isOnline: true,
            socketId: socketId // Sauvegarder le socketId ici
        };
        connectedUsers.push({...connectedUser});
    } else {
        // Si l'utilisateur existe déjà, mettre à jour son socketId
        connectedUser.socketId = socketId;
        // console.log({
        //     connectedUsers,
        //     connectedUser,
        //     socketId,
        //     userId
        // })
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
    socket.on('sendPrivateMessage', ({ senderId, receiverUsername, text , timestamp}) => {
        // Trouver le username de l'expéditeur en utilisant senderId
        const sender = connectedUsers.find(user => user.userId === senderId);
        const senderUsername = sender ? sender.username : "Inconnu";

        // Trouver le socketId du destinataire en utilisant receiverUsername
        const receiverSocketId = connectedUsers.find(user => user.username === receiverUsername)?.socketId;


        console.log(receiverSocketId)

        if (receiverSocketId) {
            // Assurez-vous d'inclure senderUsername dans l'objet émis
            io.to(receiverSocketId).emit('receivePrivateMessage', { senderId, senderUsername, receiverUsername, text, timestamp });
            console.log(`Message privé envoyé de ${senderUsername} à ${receiverUsername}: ${text}`);
        } else {
            console.log(`Destinataire non trouvé pour le username: ${receiverUsername}`);
        }
    });
}

const handleCreateChannel = (socket) => {
    socket.on('createChannel', ({ channelName, userId }) => {
        if (channels[channelName]) {
            socket.emit('channelCreationError', 'Channel name already exists.');
        } else {
            const imageUrl = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
            const id = uuidv4(); // Générer un ID unique pour le canal

            // Créer le nouveau canal avec le créateur comme seul membre
            channels[channelName] = {
                id,
                name: channelName,
                createdBy: userId,
                members: new Set([userId]),
                imageUrl: imageUrl,
            };

            // Le créateur rejoint le canal
            socket.join(channelName);

            // Informer le créateur que le canal a été créé
            socket.emit('channelCreated', { channelName, imageUrl, id }); // Inclure l'ID dans l'émission
        }
    });
};

const addUserToChannel = (socket) => {
    socket.on('addUserToChannel', ({ channelId, userIdToAdd }) => {
        const channel = channels[channelId];
        if (channel) {
            channel.members.add(userIdToAdd);
            io.to(channelId).emit('userAddedToChannel', { channelId, userId: userIdToAdd });
            console.log(`User ${userIdToAdd} added to channel ${channelId}`);
        } else {
            socket.emit('errorAddingUserToChannel', 'Channel does not exist.');
        }
    });
};

const joinChannel = (socket) => {
    socket.on('joinChannel', ({ channelId, userId }) => {
        console.log(`${userId} rejoint le canal ${channelId}`);
        socket.join(channelId);
    });
};

const handleChannelMessage = (socket) => {
    socket.on('sendChannelMessage', (message) => {
        const { channelId, senderId, text } = message;
        console.log(`Tentative d'envoi d'un message au canal ${channelId} par l'utilisateur ${senderId}`);
        io.to(channelId).emit('receiveChannelMessage', message);
        console.log(`Message envoyé au canal ${channelId}: ${text}`);
    });


    // envoyer au M si ça fonctionne
};






module.exports = {
    connectedUsers,
    init,
    addConnectUser,
    attachLogoutListener,
    handleGeneralChatMessage,
    handlePrivateMessage,
    handleChannelMessage,
    handleCreateChannel,
    addUserToChannel

};
