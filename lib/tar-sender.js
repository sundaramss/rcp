var fs = require('fs');
var io = require('socket.io-client');
var ss = require('socket.io-stream');
var tar = require('tar-fs');
var path = require('path');


module.exports = { 

	sendFiles : function (host, port, filePath) {
		var fileExists = fs.existsSync(filePath);
		console.log('File Exists', fileExists);
		if (!fileExists) {
			return;
		}
		var stats = fs.statSync(filePath);
		console.log('File Stats', stats.isDirectory());
		var filesNames = filePath.split(path.sep)
		console.log('File Path Splits', filesNames);
		var fileName = filesNames[filesNames.length - 1];
		var serverName = host +':' + port;
		var socket = io.connect('http://'+ serverName +'/files');
		var stream = ss.createStream();
		ss(socket).emit('tar-streaming', stream, {name: fileName});
		tar.pack(fileName, {filter:function(filename){console.log(filename);return false;}}).pipe(stream);
		stream.on('end', function(){
			console.log('stream end');
			socket.disconnect();
		});
	}
}