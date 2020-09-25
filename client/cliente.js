
$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var id=0;
    var username = $("#username")
    var send_message = $("#send_message")
    var chatroom = $("#chatroom")
    var chatroom2 = $("#chatroom2")
    var feedback = $("#feedback")    
    var send_username = $("#join")    

    //Enviar un nuevo mensaje
    send_message.click(function(){
        socket.emit('change_username', {username : username.val()})
        socket.emit('new_message', {message : message.val()})
        socket.emit('conectados', {username : username.val()})
    })
    
    //Publicar el nuevo mensaje
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p onclick=mensaje() id=p"+id+" class='message'>" + data.username + ": " + data.message + "</p>")
        id++;
    })
    /* socket.on("conectados", (data) => {
        feedback.html('');
        message.val('');
        chatroom2.append("<p onclick=mensaje() id=p"+id+" class='message'>" + data.username + "</p>")
        id++;
    }) */
    


    //Emit a username
    send_username.click(function(){
        socket.emit('change_username', {username : username.val()})
        socket.emit('loging')
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i><span style=\"color: black;\">" + data.username + " está escribiendo..." + "</span></i></p>")
    })

    //Listen on typing
    socket.on('loging', (data) => {
        chatroom.append("<p><i><span style=\"color: green;\">" + data.username + " se ha unido al chat." + "</span></i></p>")
    })
});


