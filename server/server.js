const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var { genarateMessage } = require('./utils/message');

app.use(express.static(publicPath));
// app.get('/', (req, res) => {
//     res.sendFile(publicPath+'/index.html');
// })

io.on('connection', socket => {
    console.log('A user connected');
    let from = 'Admin';
    let textWel = 'Welcome to my chat app';
    let textNC = 'New user joined';
    socket.emit('newMessage', genarateMessage(from, textWel));

    socket.broadcast.emit('newMessage', genarateMessage(from, textNC));
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', genarateMessage(message.from, message.text));
        callback('This is from server');
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})

