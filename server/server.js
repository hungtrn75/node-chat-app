 const path = require('path');
// const express = require('express');
// const socketIO = require('socket.io');
// const http = require('http');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const publicPath = path.join(__dirname, '../public/index.html');
const port = process.env.PORT || 3000;

//var app = express();
//var server = http.createServer(app);


//app.use(express.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile(publicPath);
})

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
})

http.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})

