var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
    socket.on('newEmail', (email) => {
        console.log(email);
    })
});

socket.on('newMessage', message => {
    console.log('newMessage: ', message);
    $('#message').append(`<li>${message.from}: ${message.text}</li>`);
})

socket.on('disconnect', () => {
    console.log("disconnected from server");
});

$('#message-form').on('submit', e => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('#txtMessage').val()
    }, () => {
        $('#txtMessage').val('');
    })
})

$('#locationBtn').on('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lng:position.coords.longitude
            })
        }, () => {
            alert('Unable to fetch location');
        });
    } else {
        return alert("Geolocation is not supported by this browser.");
    }
})