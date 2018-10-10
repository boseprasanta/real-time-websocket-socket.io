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
    socket.emit('newMessage',{ from : "Admin" , message : "Welcome to the caht room." })
    socket.broadcast.emit('newMessage',{ from : "Admin" , message : "New User Joined." })
    socket.on('disconnect',()=>{
        console.log("Client DisConnected.");
    });

    socket.on('createMessage',(message)=>{
        io.emit('newMessage',{
            from : message.from,
            text: message.text
        });
        // Socket.emit goes to a single connection
        // io.emit goes to a single connection
        // socket.broadcast.emit('newMessage',message);
    });
});

server.listen(port,()=>{
    console.log(`Server up port ${port}`);
});

console.log(__dirname+"/../public");
console.log(publicPath);
// Node module to easily handle paths