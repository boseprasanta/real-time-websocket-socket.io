const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require("socket.io");
const app = express();
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);

const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var io = socketIO(server);
var users = new Users();
io.on('connection',(socket)=>{
    // socket.emit('newMessage',generateMessage("Admin","Welcome To The chat room."));
    // socket.broadcast.emit('newMessage',generateMessage("Admin","New User Joined."));

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    })


    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if (user) {
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    socket.on('createLocationMessage',(position)=>{
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,position.latitude,position.longitude));
        }
        
    })

    socket.on('createMessage',(message,callback)=>{
        /* Sent Message can be invalid to prevent it we need Event Acknowledgement
            for that add a callback function in argement inside the listener and call it callback() to 
            acknoledge the receipt
        */
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();
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