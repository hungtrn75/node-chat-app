var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
    socket.on('newEmail', (email) => {
        console.log(email);
    })
});

socket.on('newMessage', message => {
    console.log('newMessage: ', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#message').append(li);
})

socket.on('disconnect', () => {
    console.log("disconnected from server");
});

jQuery('#message-form').on('submit', e => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text:jQuery('#txtMessage').val()
    }, () => {
        jQuery('#txtMessage').val('');
    })
})