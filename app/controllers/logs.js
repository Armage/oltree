'use strict';

/**
 * Logs
 */

var fdpUtil = require('../../libs/fdp');

/**
 * Index page
 */
exports.index = function(req, res) {
    res.render('logs/index', {title: req.app.get('title')});
}

/**
 * list logs
 *
 */
exports.allLogs = function(req, res) {
    var logs = [];

    logs = [
        {id: 1, igDate: '3B Centaure', irlDate: '12/03/2014', hex: '2605', text: 'Test hex 2605 le 3B Centaure'},
        {id: 2, igDate: '3B Centaure', irlDate: '12/03/2014', hex: '2604', text: 'Test hex 2604 le 3B Centaure'},
        {id: 3, igDate: '4B Centaure', irlDate: '12/03/2014', hex: '2504', text: 'Test hex 2504 le 4B Centaure'},
        {id: 4, igDate: '5B Centaure', irlDate: '19/03/2014', hex: '2404', text: 'Test hex 2404 le 5B Centaure'},
    ];

    res.json(logs);
}