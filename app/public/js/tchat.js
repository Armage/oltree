/**
 * Tchat
 */
$(document).ready(function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var content = $("#content");
    var name = $("#name");
    var field = $("#field");
    var sendButton = $("#send");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
            	html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ' > </b>';
                html += messages[i].message + '<br />';
            }
            content.html(html);
            content.attr('scrollTop', content.attr('scrollHeight'));
        } 
        else {
            console.log("There is a problem:", data);
        }
    });
 
    var sendMessage = function() {
    	if(name.val() == "") {
			alert("Please type your name!");
		} else {
			var text = field.val();
			socket.emit('send', { message: text, username: name.val() });
			field.val('');
		}
    }

    sendButton.on('click', sendMessage);

	$("#field").keyup(function(e) {
		if(e.keyCode == 13) {
			sendMessage();
		}
	});
 
})