var fs = require('fs');
var socketio = require('socket.io');
var ss = require('socket.io-stream');
var path = require('path');
var tar = require('tar-fs');

module.exports = { 

	startServer:function(port) {
		var io = socketio.listen(port);
		io.of('/files').on('connection', function(socket) {
		  console.log('Folders/Files Socket Receiver initialized');
		  socket.on('disconnect', function(){
			console.log('Client Disconnected');		
		  });
		  ss(socket).on('tar-streaming', function(stream, data) {
			var filename = path.basename(data.name);
			stream.pipe(tar.extract(filename,{filter:function(filename){console.log(filename);return false;}}));  
		  });
		});
	}
	
	

}