var express = require('express');
var path = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// security, do not print "Express" in header
app.disable('x-powered-by');

// some parameters
app.set('title', 'Oltree');

// app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'app/public')));

require('./app/routes/route.js')(app);

var server = app.listen(app.get('port'), function() {
	console.log('Listening on port %d', app.get('port'));
});

var tchatServer = require('./app/tchat/tchat');
tchatServer.start(server);
