module.exports = (io, socket) => {
    socket.on('joinRoom', ({ userId, otherUserId }) => {
        const roomId = [userId, otherUserId].sort().join('-');
        socket.join(roomId);
        console.log(userId, otherUserId, "joined", roomId);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté');
    });
};
