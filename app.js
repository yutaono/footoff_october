
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var serialport = require('serialport');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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
app.get('/users', user.list);

var server = http.createServer(app);

//
// serialport
//
// var portName = '/dev/tty.usbmodemfa141';
var portName = '/dev/tty.usbmodemfd131';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600
    // , dataBits: 8
    // parity: 'none',
    // stopBits: 1,
    // flowControl: false,
    , parser: serialport.parsers.readline("\n")
});

sp.on("open", function () {
    console.log('open');

    setTimeout(function() {
        sp.write("you", function(err, results) {});
    }, 1000);
});

sp.on('error', function(err) {
  console.log('err ' + err);
});

//
// socket.io
//
var io = require('socket.io').listen(server);

io.sockets.on("connection", function(socket) {
    console.log('socket connected');

    socket.on('mode change', function(_mode){
        var mode = _mode;
        console.log('mode changed : ', mode);

        setTimeout(function() {
            sp.write("mc"+mode, function(err, results) {
                if(err) console.log(err);
            });
        }, 1000);
    });
});


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
