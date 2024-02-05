import Ship from "./ship.js";
class Gameboard {
    constructor(length) {
        this.length = length;
        this.allSunk = false;
        this.board = this.createBoard();
        this.hits = new Set();
        this.missed = new Set();
        this.ships = 0;
    }

    createBoard() {
        let newBoard = [];
        for (let i = 0; i < this.length; i++) {
            newBoard.push(new Array(this.length));
        }
        return newBoard;
    }

    placeShip(coord, length, vertical) {
        if (coord[1] + length > this.length || coord[0] + length > this.length || coord[0] < 0 || 
            coord[0] > this.length || coord[1] < 0 || coord[1] > this.length ||
             this.board[coord[1]][coord[0]] != null || this.checkCollide(coord,length,vertical)) {
            return false;
        }
        if (!vertical) {
            let ship = new Ship(length);
            for (let i = 0; i < length; i++) {
                this.board[coord[1]][i + coord[0]] = ship;
            }
        } else {
            let ship = new Ship(length);
            for (let i = 0; i < length; i++) {
                this.board[i+coord[1]][coord[0]] = ship;
            }
        }
        this.ships++;
        return true;
    }
    checkCollide(coord, length, vertical) {
        if(!vertical) {
            for(let i = 0; i < length; i++) {
                if(this.board[coord[1]][i + coord[0]] != null) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
               if(this.board[i+coord[1]][coord[0]] != null){
                return true;
               }
            }
        }
        return false;
    }
    recieveAttack(coord) {
        if (this.board[coord[1]][coord[0]] instanceof Ship && !this.hits.has(coord.toString()) && !this.missed.has(coord.toString())) {
            let ship = this.board[coord[1]][coord[0]];
            ship.hit();
            this.hits.add(coord.toString());
            this.isSunk(coord);
            return true
        } else {
            this.missed.add(coord.toString());
            return false;
        }
    }

    isSunk(coord) {
        if (this.board[coord[1]][coord[0]] instanceof Ship) {
            let ship = this.board[coord[1]][coord[0]];
            if (ship.isSunk()) {
                this.ships--;
                this.allSunk = this.ships == 0;
            }
            return ship.isSunk();
        }
    }

    isAllSunk() {
        return this.allSunk;
    }

}

export default Gameboard;