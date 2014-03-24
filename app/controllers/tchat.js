'use strict';

/**
 * FdP
 */

var fs = require('fs');
var path = require('path');
var fdpUtil = require('../../libs/fdp');

exports.base = function(req, res) {
	res.render('tchat', {title: 'Oltree'});
}