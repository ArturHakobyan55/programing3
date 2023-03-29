var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, function () {
    console.log("server okay")
});

io.on('connection', function (socket) {
    for (var i in messages) {
        socket.emit("display message", messages[i]);
    }
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
    });
});
function matrixGenerator(matrixSize, grass, grassEater, predator, superhero, Bomb) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }



    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3


    }

    for (let i = 0; i < superhero; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4


    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (y == x) {
                matrix[y][x] = 5
            }
        }

    }

    for (let i = 0; i < Bomb; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 6
    }
    io.emit("send matrix")
    return matrix   
}

matrix = matrixGenerator(30, 40, 15, 5, 30, 7, 3)


grassArr = []
grassEaterArr = []
predatorArr = []
superheroArr = []
whallArr = []
bombArr = []


const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Predator = require("./predator")
const Superhero = require("./superhero")
const Whall = require("./whall")
const Bomb = require("./bomb")
function createObject() {


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            } else if (matrix[y][x] == 4) {
                var su = new Superhero(x, y)
                superheroArr.push(su)
            } else if (matrix[y][x] == 5) {
                var wh = new Whall(x, y)
                whallArr.push(wh)
            } else if (matrix[y][x] == 6) {
                var bm = new Bomb(x, y)
                bombArr.push(bm)
            }
        }

    }

}
createObject()

function gameMove() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()

    }



    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in superheroArr) {
        superheroArr[i].kill()
    }
    for (let i in bombArr) {
        bombArr[i].mul()
    }
  io.emit("send matrix")
}
 setInterval(gameMove,1000)
