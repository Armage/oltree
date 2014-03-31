/**
 * Tchat
 */
var app = angular.module('tchat', [])
    .controller('tchatController', function($scope, socket) {

        $scope.messages = [];

        socket.on('init', function (data) {
            $scope.name = data.name;
            $scope.users = data.users;
        });

        socket.on('send:message', function(message) {
            $scope.messages.push(message);
        });

        socket.on('change:name', function (data) {
            changeName(data.oldName, data.newName);
        });

        socket.on('user:join', function (data) {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has joined.'
            });
            $scope.users.push(data.name);
        });

        // add a message to the conversation when a user disconnects or leaves the room
        socket.on('user:left', function (data) {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has left.'
            });
            var i, user;
            for (i = 0; i < $scope.users.length; i++) {
                user = $scope.users[i];
                if (user === data.name) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        });

        // Private helpers
        // ===============
        var changeName = function (oldName, newName) {
            // rename user in list of users
            var i;
            for (i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i] === oldName) {
                    $scope.users[i] = newName;
                }
            }

            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + oldName + ' is now known as ' + newName + '.'
            });
        }

        // Methods published to the scope
        // ==============================
        $scope.changeName = function () {
            socket.emit('change:name', {
                name: $scope.newName
            }, function (result) {
                if (!result) {
                    alert('There was an error changing your name');
                } else {

                    changeName($scope.name, $scope.newName);

                    $scope.name = $scope.newName;
                    $scope.newName = '';
                }
            });
        };

        $scope.sendMessage = function () {
            socket.emit('send:message', {
                message: $scope.message
            });

            // add the message to our model locally
            $scope.messages.push({
                user: $scope.name,
                text: $scope.message
            });

            // clear message box
            $scope.message = '';
          };
    });

// $(document).ready(function() {

//     var messages = [];
//     var socket = io.connect('http://localhost:3000');
//     var content = $("#content");
//     var name = $("#name");
//     var field = $("#field");
//     var sendButton = $("#send");

//     socket.on('message', function (data) {
//         if(data.message) {
//             messages.push(data);
//             var html = '';
//             for(var i=0; i<messages.length; i++) {
//             	html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ' > </b>';
//                 html += messages[i].message + '<br />';
//             }
//             content.html(html);
//             content.attr('scrollTop', content.attr('scrollHeight'));
//         }
//         else {
//             console.log("There is a problem:", data);
//         }
//     });

//     var sendMessage = function() {
//     	if(name.val() == "") {
// 			alert("Please type your name!");
// 		} else {
// 			var text = field.val();
// 			socket.emit('send', { message: text, username: name.val() });
// 			field.val('');
// 		}
//     }

//     sendButton.on('click', sendMessage);

// 	$("#field").keyup(function(e) {
// 		if(e.keyCode == 13) {
// 			sendMessage();
// 		}
// 	});

// })