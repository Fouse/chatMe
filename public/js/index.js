var socket = io();
socket.on('connect', function() {
    console.log('connected to server.');
    // socket.emit('createEmail', {
    //     to: 'fous@gmail.com',
    //     text: 'Hey!'
    // });
    socket.emit('createMessage', {
        From: 'fk@example.com',
        Text: 'some text.'
    })
});
socket.on('diconnect', function() {
    console.log('disconnected from server');
});
// socket.on('newEmail', function(email) {
//     console.log('new email', email);
// });
socket.on('newMessage', function(message) {
    console.log('new message', message);
});