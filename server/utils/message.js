const moment = require('moment');

var genarateMessage = (from, text) => {
    return ({
        from,
        text,
        createdAt: moment().valueOf()
    })
}

var genarateLocationMessage = (from, location) => {
    return ({
        from,
        url: `https://www.google.com/maps?q=${location.lat},${location.lng}`,
        createdAt: moment().valueOf()
    })
}
module.exports = { genarateMessage, genarateLocationMessage };