
class Superhero extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 8;
        this.multiply = 2
        this.directions = [];
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

    chooseCell(character) {
        this.getNewCoordinates();

       return  super.chooseCell(char);
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var hun = new Superhero(newX, newY);
            vorsordArr.push(vors);
            this.multiply = 2;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 0) {
            console.log(newCell)
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    kill() {
        var emptyCells = this.chooseCell(3)
        var newCell = random(emptyCells);

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }
            }
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            
        }
        else {
            this.move()
        }
    }


    die() {
        for (let i = 0; i < superheroArr.length; i++) {
            if (superheroArr[i].x == this.x && superheroArr[i].y == this.y) {
               superheroArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}