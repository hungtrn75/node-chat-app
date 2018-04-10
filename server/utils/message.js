var genarateMessage = (from, text) => {
    return ({
        from,
        text,
        createdAt: new Date().getTime()
    })
}

var genarateLocationMessage = (from, location) => {
    return ({
        from,
        url: `https://www.google.com/maps?q=${location.lat},${location.lng}`,
        createdAt: new Date().getTime()
    })
}
module.exports = { genarateMessage, genarateLocationMessage };