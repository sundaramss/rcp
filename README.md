# remotecp

Remote copy of folders/files using socket.io

# Aim of the Tools

This tool will help you transfer the folder/files from system to system using socket.io(http), when you don't have access/restricted permission of ftp, scp(secure copy) 

# Installation

  npm install remotecp -g 

# How to transfer?

This tool have behave either server or client

*Server - By default 3131 port will open  and receive for folders/files*

*Client - Use to upload give file/folder path.*

# Commands
```
$remotecp
Options
  -s, --server        Start receive file server
  -d, --dpath string  Destination folder path
  -f, --fpath string  Upload file/folder path
  -h, --host string   default server hostname is localhost
  -p, --port number   default server port number is 3131
  -r, --resume        resume file/folder upload
```

# Server 
```
$remotecp --server [--dpath <destination folder path>]
```
# Client - upload file/folder 
```
$remotecp  --fpath <folder/file path> [--host <hostname> --port <portnumber>]
```

If upload files not completed or socket disconnected, again you can continue the upload with few conditions
* upload path should be same with previously mentioned.
* In server side, uploaded folder/files are should not be deleted.
```
$remotecp  --resume --fpath <folder/file path> [--host <hostname> --port <portnumber>]
```
# Release History
0.0.2 Initial release
