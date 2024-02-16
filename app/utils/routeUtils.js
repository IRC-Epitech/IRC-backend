const userRoutes = require('../routes/UserRoutes');
const channelRoutes = require('../routes/ChannelRoutes');
const fileUploadRoutes = require('../routes/FileUploadRoutes');
const messageRoutes = require('../routes/PrivateMessageRoutes');
const userChannelRoutes = require('../routes/UserChannelRoutes');
const generalMessageRoutes = require('../routes/GeneralMessageRoute');
const PrivateMessageRoutes = require('../routes/PrivateMessageRoutes');
const MessagesChannelsRoutes = require('../routes/MessagesChannelsRoutes');

const applyRoutes = (app) => {
    app.use(userRoutes);
    app.use('/channels',channelRoutes);
    app.use(fileUploadRoutes);
    app.use(messageRoutes);
    app.use(userChannelRoutes);
    app.use(generalMessageRoutes);
    app.use(PrivateMessageRoutes);
    app.use(MessagesChannelsRoutes);
};

module.exports = applyRoutes;
