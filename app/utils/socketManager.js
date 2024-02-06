class SocketManager {
    io;
    connectedUsers = [];

    constructor(io) {
        this.io = io;
    }

    init() {
        console.log("Socket.io initialisé avec succès")

        this.io.on('connection', (socket) => {
            console.log(`Un utilisateur est connecté, ID: ${socket.id}`);

            // Simuler l'ajout d'un utilisateur avec des données plus détaillées
            const newUser = {
                socketId: socket.id,
                // Ajoutez ici d'autres attributs pertinents, comme username, userId, etc.
                username: `User_${socket.id.substring(0, 5)}`, // Exemple de génération de nom
                // Supposons que vous avez une fonction pour obtenir une image par défaut ou une image d'utilisateur
                image: 'https://avatars.githubusercontent.com/u/35387401?v=4'
            };

            this.connectedUsers.push(newUser);
            console.log(`Utilisateur ajouté: `, newUser);

            // Mise à jour de la liste des utilisateurs pour tous les clients avec les objets utilisateur
            this.io.emit('updateUserList', this.connectedUsers.map(user => ({
                id: user.socketId, // Utilisez l'attribut que vous préférez pour identifier de manière unique l'utilisateur
                name: user.username,
                image: user.image // Assurez-vous que cette URL est valide et accessible par les clients
            })));

            socket.on('disconnect', () => {
                console.log(`Utilisateur déconnecté, ID: ${socket.id}`);
                this.disconnectUser(socket);
            });
        });
    }

    disconnectUser(socket) {
        // Trouver l'utilisateur à supprimer par socketId
        const index = this.connectedUsers.findIndex(user => user.socketId === socket.id);
        if (index !== -1) {
            const [removedUser] = this.connectedUsers.splice(index, 1);
            console.log(`Utilisateur supprimé: `, removedUser);
            // Mise à jour de la liste des utilisateurs pour tous les clients
            this.io.emit('updateUserList', this.connectedUsers.map(user => ({
                id: user.socketId,
                name: user.username,
                image: user.image
            })));
        } else {
            console.log(`Aucun utilisateur à supprimer pour l'ID: ${socket.id}`);
        }
    }
}

module.exports = SocketManager;
