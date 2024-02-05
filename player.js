import Gameboard from "./gameboard.js";
class Player {
    constructor(name) {
        this.gameboard = new Gameboard(10);
        this.name = name;
    }
}
export default Player;