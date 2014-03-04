exports.fileServer = function(file, req, res) {

	var fs = require('fs')
		, ext = require('path').extname(file)
		, type = ''
		, fileExtensions = {
				'html':'text/html',
				'css':'text/css',
				'js':'text/javascript',
				'json':'application/json',
				'jpg':'image/jpg',
				'png':'image/png',
				'wav':'audio/wav'
			};

	for(var i in fileExtensions) {
		if(ext === i) {
			type = fileExtensions[i];
			break;
		}
	}

	fs.exists(file, function(exists) {
		if(exists) {
			res.writeHead(200, {'content-type':type});
			fs.createReadStream(file).pipe(res);
		} else console.log(file, 'file dne');
	});

}
