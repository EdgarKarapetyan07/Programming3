
let side = 30
///օբյեկտներ պահելու զանգվածներ

function setup() {
       
        createCanvas(20 * side, 20 * side)
       

}



function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
                        } else if(matrix[y][x] == 2){
                                fill ("yellow")
                        }else if(matrix[y][x] == 3){
                                fill ("red")
                        }
                         else if(matrix[y][x] == 4){
                        fill ("orange")
                }
                         else if(matrix[y][x] == 5){
                        fill ("white")
                        }
                       
                        else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }
        }



                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

             

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }
                for(let i in hunterArr){
                        hunterArr[i].eat()
                }

                for(let i in ripArr){
                        ripArr[i].eat()
                        ripArr[i].mul()
                }

               
        }