const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const { generateMessage } = require('./utils/message');
// const message = require('./utils/message');
// const generateMessage = message.generateMessage;

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);
const port = process.env.Port || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected!');

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    socket.on('createMessage', (message, callback) => {
        console.log('message created', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server.');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected!');
    });
});

server.listen(port, () => {
    console.log(`server is up on port ${port} Ctrl+C to quite.`);
});