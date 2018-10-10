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
socket.on('newMessage',function(message){
    let li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
})

$('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from : $('input[name="username"]').val(),
        text : $('input[name="message"]').val()
    },(data)=>{
        $('input[name="message"]').val('')
        console.log(data);
    })
})