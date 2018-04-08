var genarateMessage = (from, text) => {
    return ({
        from,
        text,
        createdAt: new Date().getDate()
    })
}

module.exports = { genarateMessage };