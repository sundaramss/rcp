#! /usr/bin/env node
var fileReceiver = require('./lib/tar-receiver');
var fileSender = require('./lib/tar-sender');
var commandLineArgs = require('command-line-args');

var cli = commandLineArgs([
  { name: 'server', alias: 's', type: Boolean, description:"Start receive file server" },
  { name: 'file', alias: 'f', type: String, defaultOption: true, description:"Upload file/directory path" },
  { name: 'host', alias:'h', type: String,  description:"default server hostname is localhost", defaultValue: 'localhost' },
  { name: 'port', alias:'p', type: Number, description:"default server port number is 3131", defaultValue: '3131'}
]);

var options = cli.parse();

if(!(options.server || options.file)) {
	console.log(cli.getUsage());
} else if (options.server){
	fileReceiver.startServer(options.port);
} else if (options.file) {
	fileSender.sendFiles(options.host, options.port, options.file);
}
