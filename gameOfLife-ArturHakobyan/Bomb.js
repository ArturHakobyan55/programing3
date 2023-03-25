let LivingCreature = require("./LivingCreature")

module.exports = class Bomb extends LivingCreature {
    constructor(x, y) {
        super(x, y)

        this.time = 5;
        this.radius = 1
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
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
        ];
    }
    chooseCell(char, char1, char2, char3, char4) {
        this.getNewCordinates();
        let found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char2) {
                    found.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char3) {
                    found.push(this.directions[i]);
                }
            }
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char4) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }
    mul() {
        let emptyCell = this.chooseCell(0, 1, 2, 3, 4);
        let newCell = random(emptyCell)

        if (newCell) {
            this.radius++;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < superheroArr.length; i++) {
                if (superheroArr[i].x == newX && superheroArr[i].y == newY) {
                    superheroArr.splice(i, 1)
                }
            }

            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

        }
        if (this.radius > 15) {
            this.die()
        }
    }

    die() {
        for (let i = 0; i < bombArr.length; i++) {
            if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                bombArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

        for (let x = 0; x < matrix.length; x++) {
            for (let y = 0; y < matrix[x].length; y++) {
                if (matrix[x][y] == 5) {
                    matrix[x][y] = 6
                }
            }
        }
    }
}