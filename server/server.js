const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;

var app = express();
//var server = http.createServer(app);
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { genarateMessage, genarateLocationMessage } = require('./utils/message');

app.use(express.static(__dirname + '../../public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

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

    socket.on('createLocationMessage', location => {
        io.emit('newLocationMessage', genarateLocationMessage('Admin', location));
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})