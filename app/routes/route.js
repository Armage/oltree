var index = require('../controllers/index');
var logs = require('../controllers/logs');
var fdp = require('../controllers/fdp');
var tchat = require('../controllers/tchat');
var user = require('../controllers/user');

module.exports = function(app) {
    // index
    app.get('/', index.index);

    // logs
    app.get('/logs', logs.index);
    app.get('/json/logs', logs.allLogs);

    // fdp
    app.get('/fdp', fdp.base);
    app.get('/json/fdp', fdp.listFdpFile);
    app.get('/json/fdp/:file', fdp.readFdpFile);

    // chat
    app.get('/tchat', tchat.base);

    // user
    app.get('/users', user.list);
}
