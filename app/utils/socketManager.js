const User = require('../models/UserModel');

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
        handleJoinChannel(socket);
        handleChannelMessage(socket);
        handleCreateChannel(socket);
        inviteToChannel(socket);
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
            image: 'https://avatars.githubusercontent.com/u/35387401?v=4', // Exemple d'image
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
            // Créer le nouveau canal avec le créateur comme seul membre
            channels[channelName] = {
                name: channelName,
                createdBy: userId,
                members: new Set([userId]),
                imageUrl: imageUrl,
            };

            // Le créateur rejoint le canal
            socket.join(channelName);

            // Informer le créateur que le canal a été créé
            socket.emit('channelCreated', { channelName, imageUrl });

        }
    });
};
const inviteToChannel = (socket) => {
    socket.on('inviteToChannel', ({ channelId, userIdToInvite, inviterId }) => {
        // Vérifier si le canal existe
        if (!channels[channelId]) {
            socket.emit('channelInviteError', 'Channel does not exist.');
            return;
        }

        // Vérifier si l'inviteur est autorisé à inviter
        const channel = channels[channelId];
        if (channel.createdBy !== inviterId && !channel.members.has(inviterId)) {
            socket.emit('channelInviteError', 'Not authorized to invite to this channel.');
            return;
        }

        // Ajouter l'utilisateur invité à la liste des invitations en attente
        if (!channelInvitations[channelId]) {
            channelInvitations[channelId] = new Set();
        }
        channelInvitations[channelId].add(userIdToInvite);

        // Trouver le socketId de l'utilisateur invité
        const userToInvite = connectedUsers.find(user => user.userId === userIdToInvite);
        if (userToInvite) {
            // Envoyer une invitation à l'utilisateur
            io.to(userToInvite.socketId).emit('channelInvitation', { channelId, channelName: channel.name, inviterId });
        }
    });
};


const handleJoinChannel = (socket) => {
    socket.on('joinChannel', ({ channelId, userId }) => {
        // Vérifier si l'utilisateur a été invité
        if (channelInvitations[channelId] && channelInvitations[channelId].has(userId)) {
            socket.join(channelId);
            io.to(channelId).emit('channelWelcome', `${userId} has joined the channel.`);

            // Retirer l'utilisateur de la liste des invitations
            channelInvitations[channelId].delete(userId);
            if (channelInvitations[channelId].size === 0) {
                delete channelInvitations[channelId];
            }
        } else {
            socket.emit('channelJoinError', 'Not invited or channel does not exist.');
        }
    });
};


const handleChannelMessage = (socket) => {
    socket.on('sendChannelMessage', ({ channelId, senderId, text }) => {
        io.to(channelId).emit('receiveChannelMessage', { senderId, text });
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
    handleJoinChannel,
    handleChannelMessage,
    handleCreateChannel,
    inviteToChannel

};
