/**
 * Tchat server, powered by socket.io
 */
var ioLib = require('socket.io')

exports.start = function(server) {
	var io = ioLib.listen(server);

	io.sockets.on('connection', function (socket) {
		
		socket.broadcast.emit('message', { message: 'Nouvel utilisateur connecté' });
		socket.emit('message', { message: 'Bienvenue sur le tchat' });
		
		socket.on('send', function (data) {
			io.sockets.emit('message', data);
		});

	});
}