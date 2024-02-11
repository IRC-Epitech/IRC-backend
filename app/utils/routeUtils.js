const userRoutes = require('../routes/UserRoutes');
const channelRoutes = require('../routes/ChannelRoutes');
const fileUploadRoutes = require('../routes/FileUploadRoutes');
const messageRoutes = require('../routes/PrivateMessageRoutes');
const userChannelRoutes = require('../routes/UserChannelRoutes');
const generalMessageRoutes = require('../routes/GeneralMessageRoute');

const applyRoutes = (app) => {
    app.use(userRoutes);
    app.use(channelRoutes);
    app.use(fileUploadRoutes);
    app.use(messageRoutes);
    app.use(userChannelRoutes);
    app.use(generalMessageRoutes);
};

module.exports = applyRoutes;
