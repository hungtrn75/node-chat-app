var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
    socket.on('newEmail', (email) => {
        console.log(email);
    })

    // socket.emit('createEmail', {
    //     to: 'test2@example.com',
    //     createAt: new Date().getDate(),
    //     text:'this is` test 2'
    // })

    socket.emit('createMessage', {
        to: 'test2@example.com',
        text: 'hey, test 1',
        createdAt:123
    })
});

socket.on('newMessage', message => {
    console.log('newMessage: ', message);
})

socket.on('disconnect', () => {
    console.log("disconnected from server");
});