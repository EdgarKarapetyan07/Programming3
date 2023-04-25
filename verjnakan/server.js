var express = require('express')
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var fs = require("fs")

app.use(express.static("."))
app.get('/', function (req, res) {
        res.redirect('index.html')


})
server.listen(3000, function () {
        console.log("server is run");

})
//Matrix generator
function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, rip) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
        //GrassEater 2

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }
        for (let i = 0; i < hunter; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
        for (let i = 0; i < rip; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }


        return matrix
}

matrix = matrixGenerator(20, 17, 7, 4, 6, 4)


io.sockets.emit("send matrix", matrix)
//zangvacner
grassArr = []
grassEaterArr = []
predatorArr = []
hunterArr = []
ripArr = []

//modules
Grass = require("./grass");
GrassEater = require("./grassEater");
Hunter = require("./hunter");
Predator = require("./predator");
Rip = require("./rip");

// object
function createObject() {
        console.log(matrix);
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        }
                        else if (matrix[y][x] == 4) {
                                let hun = new Hunter(x, y)
                                hunterArr.push(hun)
                        }
                        else if (matrix[y][x] == 5) {
                                if (hunterArr.length == 0) {
                                        matrix[y][x] = 5

                                        let r = new Rip(x, y)

                                        ripArr.push(r)
                                }
                        }
                }

        }
        io.sockets.emit('send matrix', matrix)
}


function game() {
        for (let i in grassArr) {

                grassArr[i].mul()
        }


        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }



        for (let i in predatorArr) {
                predatorArr[i].eat()
        }
        for (let i in hunterArr) {
                hunterArr[i].eat()
        }

        for (let i in ripArr) {
                ripArr[i].eat()
                ripArr[i].mul()
        }

        io.sockets.emit("send matrix", matrix)

}

setInterval(game, 300)

io.on("connection", function () {
        createObject()

})

