# rcp

Remote copy of folders/files using socket.io

# Aim of the Tools

This tool will help you transfer the folder/files from system to system using socket.io(http), when you don't access/restricted permission of ftp, scp 

# How to transfer?

This tool have behave either server or client

*Server - By default 3131 port will open  and receive for folders/files*
*Client - Use to upload give file/folder path.*

# Commands
```
$rcp
Options
  -s, --server        Start receive file server
  -f, --fpath string  Upload file/folder path
  -h, --host string   default server hostname is localhost
  -p, --port number   default server port number is 3131
```

# Server 
```
$rcp --server
```
# Client - upload file/folder 
```
$rcp --host <hostname> --port <portnumber> --fpath <folder/file path>
```

