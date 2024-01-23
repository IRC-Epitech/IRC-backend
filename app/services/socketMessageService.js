const Message = require('../models/MessageModel');

module.exports = (io, socket) => {
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
};
