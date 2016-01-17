var fs = require('fs');
var io = require('socket.io-client');
var ss = require('socket.io-stream');
var tar = require('tar-fs');
var path = require('path');
var Util = require('./util');
module.exports = { 

	sendFiles : function (host, port, filePath, options) {
		var fileExists = fs.existsSync(filePath);
		if (!fileExists) {
			return;
		}
		var serverName = host + ':' + port;
		var socket = io.connect('http://' + serverName + '/files');
		var me = this;
		if(options && options.resume) {
			socket.on('needFilesHash', function(filters) {
				var util  = new Util();
				util.generateHashes(filePath, function(results){
					util.minusTwoSet(filters, results);
					me.startStream(socket, filePath, filters);	
				});
			});
			var fileInfo = path.parse(filePath);
			var fileName = fileInfo.base;			
			socket.emit('needFilesHash', {fpath:fileName});
		} else {
			me.startStream(socket, filePath);
		}
	},
	startStream : function(socket, filePath, filters) {
		
		var fileInfo = path.parse(filePath);
		var fileName = fileInfo.base;
		var normalPath = path.normalize(filePath);
		var stream = ss.createStream();
		
		ss(socket).emit('tar-streaming', stream, {name: fileName});
		
		tar.pack(filePath, {
			filter: function(filepath){
				var filename = filepath.replace(normalPath,'').replace(/^[\\|\/]*/,'');
				var skip = (filters && filters[filename]) ? true : false;
				var msg = (skip) ? 'Skip' : 'Uploading'; 
				console.log(msg + '...', filename);
				return skip;
			}
		}).pipe(stream);
	
		stream.on('end', function(){
			console.log('stream end');
			socket.disconnect();
		});
	}
}