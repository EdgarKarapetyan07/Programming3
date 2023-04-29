var express = require('express')
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var fs = require("fs");

// const { kill } = require('process');
// const Fire = require('./fire');
// const Grass = require('./grass');
// const GrassEater = require('./grassEater');
// const Hunter = require('./hunter');
// const Predator = require('./predator');
// const Rip = require('./rip');

app.use(express.static("."))

app.get('/', function (req, res) {
        res.redirect('index.html')


})
server.listen(3000, function () {
        console.log("server is run");

})
//Matrix generator
function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, rip, fire) {
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
        for (let i = 0; i < fire; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }

        return matrix
}

matrix = matrixGenerator(40, 17, 7, 4, 6, 4, 7)


io.sockets.emit("send matrix", matrix)
//zangvacner
firearr = []
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
Fire = require("./fire")
// object
function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let preda = new Predator(x, y)
                                predatorArr.push(preda)
                        }
                        else if (matrix[y][x] == 5) {
                                let hu = new Hunter(x, y)
                                hunterArr.push(hu)
                        }
                        else if (matrix[y][x] == 4) {
                                if (hunterArr.length == 0) {
                                        matrix[y][x] = 5
                                        let r = new Rip(x, y)
                                        ripArr.push(r)
                                }
                        }

                        else if (matrix[y][x] == 6) {
                                let f = new Fire(x, y)
                                firearr.push(f)
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
        for (let i in firearr) {
                firearr[i].eat()

        }

        io.sockets.emit("send matrix", matrix)

}

setInterval(game, 400)


var weath;

function Winter() {
        weath = "winter";
        io.sockets.emit('Winter', weath);
}

function Summer() {
        weath = "summer";
        io.sockets.emit('Summer', weath);
}

function Spring() {
        weath = "spring";
        io.sockets.emit('Spring', weath);
}
function Autumn() {
        weath = "autumn";
        io.sockets.emit('Autumn', weath);
}


function Kill() {
        firearr = []
        grassArr = []
        grassEaterArr = []
        predatorArr = []
        hunterArr = []
        ripArr = []
        for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                        matrix[y][x] = 0;
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddGrass() {
        for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 1;
                        var gr = new Grass(x, y);
                        grassArr.push(gr);
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddGrassEater() {
        let count = 0;
        for (var i = 0; i < 50; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (count < 7) {
                        if (i < 30) {
                                if (matrix[y][x] == 0) {
                                        count++;
                                        matrix[y][x] = 2;
                                        var grEater = new GrassEater(x, y);
                                        grassEaterArr.push(grEater);
                                }

                        } else if (i >= 30) {
                                if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                                        count++;
                                        matrix[y][x] = 2;
                                        var grEater = new GrassEater(x, y);
                                        grassEaterArr.push(grEater);
                                }
                        }
                }


        }

        io.sockets.emit("send matrix", matrix);
}
function AddHunter() {
        for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 3;
                        var hunt = new Hunter(x, y);
                        hunterArr.push(hunt);
                }
        }
        io.sockets.emit("send matrix", matrix);
}
//     function AddPredator() {
//         for (var i = 0; i < 7; i++) {
//             var x = Math.floor(Math.random() * matrix[0].length)
//             var y = Math.floor(Math.random() * matrix.length)
//             if (matrix[y][x] == 0) {
//                 matrix[y][x] = 3;
//                 var gishatich = new Gishatich(x, y);
//                 gishatichner.push(gishatich);
//             }
//         }
//         io.sockets.emit("send matrix", matrix);
//     }

function AddPredator() {
        for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 4;
                        var pred = new Predator(x, y);
                        predatorArr.push(pred);
                }
        }
        io.sockets.emit("send matrix", matrix);
}

function AddRip() {
        for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 5;
                        var r = new Rip(x, y);
                        ripArr.push(r);
                }
        }
        io.sockets.emit("send matrix", matrix);
}

function AddFire() {
        for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 6;
                        var fi = new Fire(x, y);
                        firearr.push(fi);
                }
        }
        io.sockets.emit("send matrix", matrix);
}






io.on('connection', function (socket) {
        createObject();
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on("addGrass", AddGrass);
        socket.on("addGrassEater", AddGrassEater);
        socket.on("killAll", Kill);
        socket.on("addHunter", AddHunter);
        socket.on("addPredator", AddPredator);
        socket.on("addRip", AddRip);
        socket.on("addFire", AddFire);




})







var statistics = {};
setInterval(function () {
        statistics.grass = grassArr.length;
        statistics.grassEater = grassEaterArr.length;
        statistics.hunter = hunterArr.length;
        statistics.predator = predatorArr.length;
        statistics.rip = ripArr.length;
        statistics.fire = firearr.length;
        fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        })
}, 1000);

