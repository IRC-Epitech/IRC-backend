const moment = require('moment-timezone');

function toFrenchTime(date) {
    return moment(date).tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss');
}

module.exports = { toFrenchTime };
