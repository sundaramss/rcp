var fs = require('fs');
var hashdir = require('hashdir');
var crypto = require('crypto');
var path = require('path');

function Util() {
	
	this.generateHashes = function(fpath, cb) {
		var fsstat = null;
		try {
			fsstat = fs.statSync(fpath); 
		}catch(e) {
			console.log('Path Not exists', fpath);
			cb({});
			return;
		}
		if(fsstat.isDirectory()){
			hashdir(fpath, function(err, results){
				cb(results);
			});		
		} else if(fsstat.isFile()) {
			var shasum = crypto.createHash('sha1');
			fs.createReadStream(fpath)
				.on('data', shasum.update.bind(shasum))
				.on('error', cb)
				.on('end', function () {
					var result = {};
					var filename = path.basename(fpath)
					result[filename] = shasum.digest('hex');
					cb(result);
				});
		} else {
			cb({});
		}	
	};

	this.minusTwoSet = function(a, b) {
		if(!a){
			return null;	
		}
		for(k in a) {
			if( b[k] ) {
				if( a[k] !== b[k] ){
					delete a[k];
				}
			}
		}
	}
}

module.exports = Util;