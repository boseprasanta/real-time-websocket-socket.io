const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");
const app = express();
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);

var io = socketIO(server);
io.on('connection',(socket)=>{
    console.log("New Client Connected.");
    socket.on('disconnect',()=>{
        console.log("Client DisConnected.");
    });

    socket.on('createMessage',(message)=>{
        console.log("New Mesage Created");
        console.log(message);
        socket.emit('newMessage',message);
    });
});

server.listen(port,()=>{
    console.log(`Server up port ${port}`);
});

console.log(__dirname+"/../public");
console.log(publicPath);
// Node module to easily handle paths