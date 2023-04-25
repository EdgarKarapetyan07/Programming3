let LivingCreature=require("./LivingCreature")
module.exports = class Rip extends LivingCreature{
    constructor(x, y) {
       super(x,y)
        this.energy = 10
        this.directions = []

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char, char1,char2,char3) {
        this.getNewCoordinates()
        let found = []


        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char2) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char3) {
                    found.push(this.directions[i])
                }
            }
       
        }


        return found



    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
     if(hunterArr.length == 0){
        matrix[newY][newX] = 5

        let r = new Rip(newX, newY)

        ripArr.push(r)
     }
       


        }
    }
    eat() {
        let emptyCell = this.chooseCell(1,2,3,4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 7
            let newX = newCell[0]
            let newY = newCell[1]
            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                }
            }
           
            
            for (let i in hunterArr) {
                if (newX == hunterArr[i].x && newY == hunterArr[i].y) {
                    hunterArr.splice(i, 1)
                }
            }
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
            console.log(this.energy);

            if (this.energy >= 15) {
                this.mul()
            
            }
           
        }  else {
            this.move()
        }

    }
    move() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            this.energy-5

            if (this.energy < 0) {
                this.die()
                }
        }
    }
    die() {
        matrix[this.y][this.x] = 0

        for (let i in ripArr) {
            if (this.x == ripArr[i].x && this.y == ripArr[i].y) {
                ripArr.splice(i, 1)
            }
        }
    }
    

}










