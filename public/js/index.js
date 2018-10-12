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
socket.on('newLocationMessage',function(message){
    let li = $('<li></li>');
    let a = $('<a target="_blank">My Curreent Location</a>');

    li.text(`${message.from}`);
    a.attr('href',message.url);
    li.append(a);

    $('#messages').append(li);
})

$('#message-form').on('submit',function(e){
    e.preventDefault();

    let messageTextBox = $('input[name="message"]');

    socket.emit('createMessage',{
        from : "USER",
        text : messageTextBox.val()
    },(data)=>{
        messageTextBox.val('');
    })
});

let shareLocationButton = $('#send-location');

shareLocationButton.on("click",function(){
    if(!navigator.geolocation){
        return alert("Your browser doesn't support geolocation");
    }

    shareLocationButton.attr('disabled','disabled').text('Sending Location ...');

    navigator.geolocation.getCurrentPosition((position)=>{
        shareLocationButton.removeAttr('disabled').text('Send Location');
        socket.emit("createLocationMessage",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },()=>{
        shareLocationButton.removeAttr('disabled').text('Send Location');
        alert("Something went worng");
    },{timeout:10000});
});