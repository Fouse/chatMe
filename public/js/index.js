var socket = io();
socket.on('connect', function() {
    console.log('connected to server.');
});

socket.on('diconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
    var newMsg = $(`<li>${message.from}: ${message.text} ${message.createdAt}</li>`);

    $('#messages').append(newMsg);
});

// socket.emit('createMessage', {
//     from: 'Jeff',
//     text: 'hello'
// }, function(data) {
//     console.log('Got it', data);

// });
$(document).ready(function() {
    console.log("ready!");
});
$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});