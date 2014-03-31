'use strict';

/**
 * FdP
 */

var fs = require('fs');
var path = require('path');
var fdpUtil = require('../../libs/fdp');

exports.base = function(req, res) {
	res.render('fdplist', {title: req.app.get('title')});
}

/**
 * list fdp files
 *
 */
exports.listFdpFile = function(req, res) {
	var fdpPath = path.join(__dirname, '../../files');
	var files = [];

	fs.readdirSync(fdpPath).forEach(function(file) {
		var newPath = path.join(fdpPath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
			files.push(file);
		}
    });

    res.json(files);
}

/**
 * read fdp file
 *
 * @param string fdpFilename path to the fdp file
 * @return json structure with associated template
 */
exports.readFdpFile = function (req, res) {
	var filesDir = '../../files/';

	// fdp
	var fdpFilename = path.join(__dirname, filesDir, req.params.file);
	var data = fs.readFileSync(fdpFilename, 'utf8');
	var fdpData = fdpUtil.processFdPFile(data);

	// template
	var tplFilename = path.join(__dirname, filesDir, 'templates', fdpData.template + '.json');
	var data = fs.readFileSync(tplFilename, 'utf8');
	var tplData = fdpUtil.processFdPFile(data);

	var mergeData = fdpUtil.mergeFields(fdpData, tplData);

	res.json(mergeData);
}
