const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");
const app = express();
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);

const {generateMessage} = require("./utils/message");

var io = socketIO(server);
io.on('connection',(socket)=>{
    socket.emit('newMessage',generateMessage("Admin","Welcome To The chat room."));
    socket.broadcast.emit('newMessage',generateMessage("Admin","New User Joined."))
    socket.on('disconnect',()=>{
        console.log("Client DisConnected.");
    });


    socket.on('createMessage',(message,callback)=>{
        /* Sent Message can be invalid to prevent it we need Event Acknowledgement
            for that add a callback function in argement inside the listener and call it callback() to 
            acknoledge the receipt
        */
        callback('This is from server');
        io.emit('newMessage',generateMessage(message.from,message.text));
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