# rcp

Remote copy of folders/files using socket.io

# Aim of the Tools

This tool will help you transfer the folder/files from system to system using socket.io(http), when you don't access/restricted permission of ftp, scp 

# How to transfer?

This tool have behave either server or client
Server - By default 3131 port will open  and receive for folders/files
Client - Use to upload give file/directory path.

# Commands
$rcp
Options
  -s, --server        Start receive file server
  -f, --file string   Upload file/directory path
  -h, --host string   default server hostname is localhost
  -p, --port number   default server port number is 3131


