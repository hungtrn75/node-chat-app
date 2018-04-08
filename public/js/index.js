var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
    socket.on('newEmail', (email) => {
        console.log(email);
    })
});

socket.on('newMessage', message => {
    console.log('newMessage: ', message);
})

socket.on('disconnect', () => {
    console.log("disconnected from server");
});