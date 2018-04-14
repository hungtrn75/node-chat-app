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
    console.log('A user connected');
    let admin = 'Admin';
    let textWel = 'Welcome to my chat app';
    
    socket.on('join', (params, callback) => {
        if (!isRealName(params.name) && !isRealName(params.room)) {
            callback('Name is invalid');
        }
        socket.join(params.room);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        let textNC = `${params.name} has joined chatroom`;
        socket.emit('newMessage', genarateMessage(admin, textWel));
        socket.broadcast.to(params.room).emit('newMessage', genarateMessage(admin, textNC));
        
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', genarateMessage(message.from, message.text));
        callback('This is from server');
    })

    socket.on('createLocationMessage', location => {
        io.emit('newLocationMessage', genarateLocationMessage(admin, location));
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', genarateMessage(admin,`${user.name} has left chat room`));
        }
    })
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})