const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const path = require('path');

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);
const port = process.env.Port || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected!');

    // socket.emit('newMessage', {
    //     From: 'James',
    //     Text: 'some text',
    //     createdAt: 1234
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });
    socket.on('createMessage', (message) => {
        console.log('message created', message);
        io.emit('newMessage', {
            From: message.from,
            Text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected!');
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port} Ctrl+C to quite.`);
});