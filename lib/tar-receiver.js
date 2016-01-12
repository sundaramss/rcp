var fs = require('fs');
var socketio = require('socket.io');
var ss = require('socket.io-stream');
var path = require('path');
var tar = require('tar-fs');

function Receiver(port,folderPath) { 
	this.port = port;
	this.folderPath = folderPath || '.'; 
}

Receiver.prototype.startServer = function() {
	var io = socketio.listen(this.port);
	var me = this;
	io.of('/files')
		.on('connection', function(socket) {
	  		console.log('Folders/Files Socket Receiver initialized');
			socket.on('disconnect', function(){
				console.log('Client Disconnected');		
			});
			socket.on('resume', function() {
				//TODO: read list of files under the given directory with check sum value
				//Emit the result to client
			});
			ss(socket).on('tar-streaming', function(stream, data) {
				var jpath = path.join(me.folderPath, data.name);
				var filename = path.basename(data.name);
				console.log('FileName---->', data.name, filename, me.folderPath, jpath);
				stream.pipe(tar.extract(jpath,{filter:function(filename){console.log(filename);return false;}}));  
			});
		});
}

module.exports = Receiver