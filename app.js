const express = require('express');
const app = express()
const path = require('path')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use('/app', express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('product_request', function (msg) {
        socket.broadcast.emit('arrived',msg);
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
