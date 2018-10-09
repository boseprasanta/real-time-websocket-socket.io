var socket = io();//Open a connection to server and keep it open.
socket.on('connect',()=>{
    console.log("Server Connected.");
});
socket.on('disconnect',()=>{
    console.log("Server DisConnected.");
});

socket.on('newEmail',function(email){
    console.log('New Email');
    console.log(email);
})