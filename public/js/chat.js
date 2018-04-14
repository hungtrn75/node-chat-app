var socket = io();

function scrollToBottom() {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    console.log('connected to server');
    socket.on('newEmail', (email) => {
        console.log(email);
    })
    var params = $.deparam(window.location.search);
    socket.emit('join', params, err => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('Not error!');
        }
    })
})

socket.on('updateUserList', users => {
    let ol = $('<ol></ol>');
    users.forEach(user => {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
})

socket.on('newMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm:ss a');
    //$('#messages').append(`<li>[${formattedTime}] - ${message.from}: ${message.text}</li>`);
    let html = Mustache.render($('#message-template').html(), {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
})

socket.on('newLocationMessage', message => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    //$('#messages').append(`<li>[${formattedTime}] - ${message.from}: <a href="${message.url}" target="_blank">My location</a></li>`)
    let html = Mustache.render($('#location-message-template').html(), {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
})
socket.on('disconnect', () => {
    console.log("disconnected from server");
});

$('#message-form').on('submit', e => {
    e.preventDefault();
    var params = $.deparam(window.location.search);
    socket.emit('createMessage', {
        from: params.name,
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
                lng: position.coords.longitude
            })
        }, () => {
            $('#locationBtn').attr('disabled', 'disabled');
            alert('Unable to fetch location');
        });
    } else {
        return alert("Geolocation is not supported by this browser.");
    }
})