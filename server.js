///////////////////////////////////////
// REQUIREMENTS
///////////////////////////////////////
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

///////////////////////////////////////
// VARIABLES
///////////////////////////////////////
let usersOnline = 0;

///////////////////////////////////////
// EXPRESS
///////////////////////////////////////
// Setting Up Express App
app.use(express.static(__dirname + '/Client'));

// Express Routes
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'Client', 'index.html'));
});

///////////////////////////////////////
// SOCKET.IO
///////////////////////////////////////
io.on('connection', (socket) => {
    usersOnline++;
    io.emit('usersOnline', {number: usersOnline});

    socket.on('disconnect', () => {
        usersOnline--;
        io.emit('usersOnline', {number: usersOnline});
    })
});

///////////////////////////////////////
// LISTEN
///////////////////////////////////////
server.listen((process.env.PORT || 5000), () => {
    console.log("Server Running on Port: " + (process.env.PORT || 5000));
});