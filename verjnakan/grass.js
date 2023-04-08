class Grass extends LivinegCreature{
    constructor(x,y){
        super(x,y)
        this.multiply = 0
       
    
    }
    
    

    mul(){
         this.multiply++
          let emptyCell = this.chooseCell(0)
          let newCell = random (emptyCell)
      
          if(newCell && this.multiply >= 5){
                     let newX  =   newCell[0]
                     let newY  =   newCell[1]

                     matrix[newY][newX] = 1

                     let grass = new Grass(newX,newY)
                     grassArr.push(grass)


                     this.multiply = 0


          }
          
    }


}

