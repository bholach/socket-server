const express = require('express');
const app = express()
const path = require('path')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.port || 3000;

app.use('/app', express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('msg', function (msg) {
        socket.broadcast.emit('msg',msg);
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});