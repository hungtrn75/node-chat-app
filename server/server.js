const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const { Users } = require('./utils/users');

var app = express();
//var server = http.createServer(app);
var server = require('http').Server(app);
var io = require('socket.io')(server);
var { genarateMessage, genarateLocationMessage } = require('./utils/message');
var { isRealName } = require('./utils/validation');
var users = new Users();

app.use(express.static(__dirname + '../../public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
    socket.on('join', (params, callback) => {
        if (!isRealName(params.name) || !isRealName(params.room)) {
            callback('Name is invalid');
        }
        let user = users.users.filter(user => user.name === params.name && user.room === params.room);
        if (user[0]) {
            callback(`${params.name} is exist in room ${params.room}`);
        } else {
            console.log('New user connected');
            socket.join(params.room);
            users.addUser(socket.id, params.name, params.room);
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', genarateMessage('Admin', 'Welcome to my chat app'));
            socket.broadcast.to(params.room).emit('newMessage', genarateMessage('Admin', `${params.name} has joined chatroom`));

            callback();
        }
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if (user && isRealName(message.text)) {
            io.to(user.room).emit('newMessage', genarateMessage(message.from, message.text));
        }
        callback('This is from server');
    })

    socket.on('createLocationMessage', location => {
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', genarateLocationMessage(user.name, location));
        }
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', genarateMessage('Admin', `${user.name} has left chat room`));
            console.log('A user disconnected');
        }
    })
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})