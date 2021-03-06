var socket = io();//Open a connection to server and keep it open.

function scrollToBottom(){
    let messages = $("#messages");
    let  newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight'),
        scrollTop = messages.prop('scrollTop'),
        scrollHeight = messages.prop('scrollHeight'),
        newMessageHeight = newMessage.innerHeight(),
        lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect',()=>{
    let params = jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){
        if(err) {
            window.location.href = '/';
            alert(err);
        } else {
            console.log('No Error')
        }
    });

    // socket.emit('createEmail',{
    //     to : 'prasanta@cashlu.com',
    //     subject :  "Email Subject",
    //     body : "Email Body"
    // });
});
socket.on('disconnect',()=>{
    console.log("Server DisConnected.");
});
socket.on('newMessage',function(message){
    let formatedTime = moment(message.createdAt).format('hh:mm a');
    // let li = $('<li></li>');
    // li.text(`${message.from} ${formatedTime} : ${message.text}`);
    let template = $("#message-template").html();
    let html = Mustache.render(template,{
        from : message.from,
        createdAt : formatedTime,
        text :message.text
    });
    $('#messages').append(html);
    scrollToBottom();
})
socket.on('newLocationMessage',function(message){
    let formatedTimeLoc = moment(message.createdAt).format('hh:mm a');
    // let li = $('<li></li>');
    // let a = $('<a target="_blank">My Current Location</a>');
    let template = $("#location-message-template").html();
    let html = Mustache.render(template,{
        from : message.from,
        createdAt : formatedTimeLoc,
        url :message.url
    });
    $('#messages').append(html);
    scrollToBottom();
    // li.text(`${message.from} ${formatedTimeLoc} : `);
    // a.attr('href',message.url);
    // li.append(a);

    // $('#messages').append(li);
})

socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

$('#message-form').on('submit',function(e){
    e.preventDefault();

    let messageTextBox = $('input[name="message"]');

    socket.emit('createMessage',{
        // from : "USER",
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