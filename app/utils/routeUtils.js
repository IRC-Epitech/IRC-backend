const userRoutes = require('../routes/UserRoutes');
const channelRoutes = require('../routes/ChannelRoutes');
const fileUploadRoutes = require('../routes/FileUploadRoutes');
const messageRoutes = require('../routes/MessageRoutes');
const userChannelRoutes = require('../routes/UserChannelRoutes');

const applyRoutes = (app) => {
    app.use(userRoutes);
    app.use(channelRoutes);
    app.use(fileUploadRoutes);
    app.use(messageRoutes);
    app.use(userChannelRoutes);
};

module.exports = applyRoutes;
