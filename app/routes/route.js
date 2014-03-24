var index = require('../controllers/index');
var fdp = require('../controllers/fdp');
var tchat = require('../controllers/tchat');
var user = require('../controllers/user');

module.exports = function(app) {
	// index
	app.get('/', index.index);
	
	// fdp
	app.get('/fdp', fdp.base);
	app.get('/json/fdp', fdp.listFdpFile);
	app.get('/json/fdp/:file', fdp.readFdpFile);

	// chat
	app.get('/tchat', tchat.base);
	
	// user
	app.get('/users', user.list);
}
