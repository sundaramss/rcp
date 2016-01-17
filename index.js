#! /usr/bin/env node
var FileReceiver = require('./lib/tar-receiver');
var fileSender = require('./lib/tar-sender');
var commandLineArgs = require('command-line-args');

var cli = commandLineArgs([
  { name: 'server', alias: 's', type: Boolean, description:"Start receive file server" },
  { name: 'fpath', alias: 'f', type: String, defaultOption: true, description:"Upload file/directory path" },
  { name: 'dpath', alias: 'd', type: String, description:"Destination directory path" },
  { name: 'host', alias:'h', type: String,  description:"default server hostname is localhost", defaultValue: 'localhost' },
  { name: 'port', alias:'p', type: Number, description:"default server port number is 3131", defaultValue: '3131'},
  { name: 'resume', alias:'r', type: Boolean, description:"resume file/folder upload.", defaultValue: false}
]);

var options = {}
try {
	options = cli.parse();
}catch(e) {
	console.log('Unable to read the options')
	console.log(cli.getUsage());
	process.exit(1);
}

if(!(options.server || options.fpath)) {
	console.log(cli.getUsage());
} else if (options.server){
	var fileReceiver = new FileReceiver(options.port, options.dpath);
	fileReceiver.startServer();
	console.log('File Receiver Ready ... ...');
} else if (options.fpath) {
	fileSender.sendFiles(options.host, options.port, options.fpath, {resume:options.resume});
}
