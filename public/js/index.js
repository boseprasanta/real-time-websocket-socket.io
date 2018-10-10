var socket = io();//Open a connection to server and keep it open.
socket.on('connect',()=>{
    console.log("Server Connected.");
    socket.emit('createEmail',{
        to : 'prasanta@cashlu.com',
        subject :  "Email Subject",
        body : "Email Body"
    });
});
socket.on('disconnect',()=>{
    console.log("Server DisConnected.");
});

socket.on('newEmail',function(email){
    console.log('New Email');
    console.log(email);
})

socket.on('newMessage',function(message){
    console.log('New Message Received');
    console.log(message);
})