var socket = io()
let side = 30
///օբյեկտներ պահելու զանգվածներ

function setup() {
       
        createCanvas(20 * side, 20 * side)
       

}
        
socket.on("Winter", function (data) {
        weath = data;
    })
    socket.on("Summer", function (data) {
        weath = data;
    })
    socket.on("Spring", function (data) {
        weath = data;
    })
    socket.on("Autumn", function (data) {
        weath = data;
    })
     var weath = "spring";
     
     function nk(matrix) {
     for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weath == "spring") {
                    fill("darkgreen");
                }
                else if (weath == "summer") {
                    fill("#79a83b");
                }
                else if (weath == "autumn") {
                    fill("#ff8453");
                }
                if (weath == "winter") {
                    fill("#ffffff");
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("deepskyblue");
            }
            else if (matrix[y][x] == 5) {
                fill("#a142f5");
            }
            else if (matrix[y][x] == 6) {
                fill("#af490a");
            }
            rect(x * side, y * side, side, side);

        }
    }
     }





socket.on("send matrix", nk )

function Winter() {
        socket.emit("winter");
    }
    function Summer() {
        socket.emit("summer");
    }
    function Spring() {
        socket.emit("spring");
    }
    function Autumn() {
        socket.emit("autumn");
    }
    function AddGrass(){
        socket.emit("addGrass");
    }
    function AddGrassEater(){
        socket.emit("addGrassEater");
    }
    function KillAll(){
        socket.emit("killAll");
    }
    function AddHunter(){
        socket.emit("addHunter");
    }
    function AddPredator(){
        socket.emit("addPredator");
    }
    function AddRip(){
        socket.emit("addRip");
    }
    function AddFire(){
        socket.emit("addFire");
    
    }

