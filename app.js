var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , hogan = require('hogan.js')
  , request = require('request')
  , utils = require('./lib/utils')
  , api_url = 'https://www.bitstamp.net/api/ticker/'
  , port = process.env.PORT || process.argv[2] + ''
  , count = 0;

function handler(req, res) {
  var file = __dirname + req.url;
    if(req.url === '/') {
      switch(req.method) {
        case 'GET':
	  utils.fileServer(__dirname + '/views/index.html', req, res);
	  break;
	case 'POST':
	  // stuff
	  break;
      }	 
    } else {
      utils.fileServer(file, req ,res);
    }
}

function hitServer() {
  count++;
  request(api_url, function(err, res, body) {
    if(err) throw err;
    console.log(count + ' ' + body);
    io.sockets.send(body);
  })
}

function initRTC() {
  setInterval(hitServer, 3000);	
}

initRTC();
app.listen(port);
console.log('talking to bitstamp api');
