var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];
app.use(express.static("."));
app.get('/', function (req, res) {
res.redirect('index.html');
});

server.listen(3000,function(){
    console.log("server okay")
});

io.on('connection', function (socket) {
    for(var i in messages) {
    socket.emit("display message" , messages[i]);
    }
    socket.on("send message" , function (data) {
    messages.push(data);
    io.sockets.emit("display message" , data);
    });
    });