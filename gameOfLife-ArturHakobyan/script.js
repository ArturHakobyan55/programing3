function matrixGenerator(matrixSize,grass,grassEater,predator,superhero,Bomb) {
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
          
           if (y==x){
               matrix[y][x]=5
           }
        }
          
      }

      for (let i = 0; i < Bomb ;i++) {
        
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 6
      }

    return matrix
}

var matrix = matrixGenerator(30,40,15,5,30,7,3)
var side = 25
//

var grassArr = []
var grassEaterArr = []
var predatorArr = [] 
var superheroArr = [] 
var whallArr = []
var bombArr = []


function setup() {
    frameRate(15)
    createCanvas(matrix[0].length * side ,matrix.length * side)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
       
           if(matrix[y][x] == 1){
                var gr = new Grass(x,y)
                grassArr.push(gr)
           }else  if(matrix[y][x] == 2){
            var grEat = new GrassEater(x,y)
            grassEaterArr.push(grEat)
           }else if(matrix[y][x] == 3){
            var pred = new Predator(x,y)
                predatorArr.push(pred)
            }else if(matrix[y][x] == 4){
                var su = new Superhero(x,y)
                    superheroArr.push(su)
             }else if(matrix[y][x] == 5){
                 var wh = new Whall(x,y)
                     whallArr.push(wh)
             }else if(matrix[y][x] == 6){
                    var bm = new Bomb(x,y)
                        bombArr.push(bm)
           }
        }
        
    }

}


function draw() {
    
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
          var tbot = side-side*0.1
          textSize (tbot)
              if(matrix[y][x] == 1){
                   fill ("green")
                   rect(x * side, y * side,side,side)
                   text('🍀',x * side,y * side + tbot)
              }else if (matrix[y][x] == 2){
                      fill ("yellow")
                      rect(x * side, y * side,side,side)
                   text('🐝',x * side,y * side + tbot)
              }else if(matrix[y][x] == 3){
                      fill ("red")
                      rect(x * side, y * side,side,side)
                      text('👺',x * side,y * side + tbot)
              }else if(matrix[y][x] == 4){
                      fill ("magenta") 
                      rect(x * side, y * side,side,side)
                      text('🦹🏼‍♂️',x * side,y * side + tbot)   
              }else if(matrix[y][x] == 5){
                       fill ("purple") 
                       rect(x * side, y * side,side,side)
                       text('🚧',x * side,y * side + tbot)
              }else if(matrix[y][x] == 6){
                       fill ("black") 
                       rect(x * side, y * side,side,side)
                      text('🧨',x * side,y * side + tbot)
              }        
              else{
                  fill ("gray")
                  rect (x * side , y * side ,side,side)
              }
      }
        
    }

    for(let i in  grassArr){
          grassArr[i].mul()
    }

    for(let i in  grassEaterArr){
      grassEaterArr[i].eat()
      
}



   for(let i in predatorArr){
       predatorArr[i].eat()
   }
   for(let i in superheroArr){
      superheroArr[i].kill()
  }
  for(let i in bombArr){
    bombArr[i].mul()
  }
}