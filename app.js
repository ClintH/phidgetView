var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app);
GLOBAL.io = require('socket.io').listen(server, {log:false});

server.listen(app.get('port'), function(){
  console.log('Phidget Viewer listening on port ' + app.get('port'));
});

// var PhidgetManager = require("./phidgets/manager");
// var m = new PhidgetManager(this);

// var InterfaceKit = require("./phidgets/interfacekit");
// var ik = new InterfaceKit(this);

var FirmataManger = require("./firmata/manager");
var fm = new FirmataManger(this);

io.sockets.on("connection", function(socket) {
	socket.on("discover", function() {
		//return m.discover(socket);
	})
});