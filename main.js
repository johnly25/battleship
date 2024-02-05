import Player from "./player.js";

const domController = (function () {
    const players = [new Player("Player 1"), new Player("Player 2")];
    let currentPlayer = players[0];
    let gameOver = false;
    
    const gameLoop = function (player, x, y) {
        if (!gameOver) {
            if (players[player] == currentPlayer && !currentPlayer.gameboard.hits.has([x, y].toString()) && !currentPlayer.gameboard.missed.has([x, y].toString())) {
                if (currentPlayer.gameboard.recieveAttack([x, y])) {
                    console.log('recieved attack')
                    gameOver = currentPlayer.gameboard.allSunk;
                } else {
                    console.log('missed or did not recieve attack')
                    console.log((parseInt(player) + 1) % 2);
                    currentPlayer = players[(parseInt(player) + 1) % 2];
                }
            } else {
                console.log("not the current player or move already made");
            }
        }
        updateDisplay();
    }

    const loadGame = function () {
        setupShipsRandom(players[0]);
        setupShipsRandom(players[1]);
        loadUI();
        setupListeners();
    }

    const setupShips = function () {
        // players[0].gameboard.placeShip([0, 0], 2, false);
        // players[0].gameboard.placeShip([0, 2], 2, false);
        players[1].gameboard.placeShip([0, 0], 2, false);
        players[1].gameboard.placeShip([0, 2], 2, false);
    }

    const setupShipsRandom = function (player) {
        let board = [];
        let ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                board.push([j, i]);
            }
        }
        let ship = ships[0];
        while (ship) {
            let index = Math.floor(Math.random() * board.length);
            let coord = board[index];
            let vertical = Math.random() > .5;
            if (player.gameboard.placeShip(coord, ship, vertical)) {
                ship = ships.shift();
                board.splice(index, 1);
            }
        }

    }

    const loadUI = function () {
        let container = document.createElement('div');
        let nav = document.createElement('div');
        let title = document.createElement('div');
        title.textContent = "Battleship";
        title.classList.add('title');
        let status = document.createElement('div');
        status.textContent = "Player 1's Turn"
        status.classList.add('status');
        nav.classList.add('nav');
        container.classList.add('container');
        container.append(createPlayerSection(players[0]));
        container.append(createPlayerSection(players[1]))
        document.body.append(nav, title, status, container);
        updateBoard(players[0]);
        updateBoard(players[1]);
    }

    const updateDisplay = function () {
        let status = document.querySelector('.status');
        if (gameOver) {
            status.textContent = currentPlayer.name + " WON"
        } else {
            status.textContent = currentPlayer.name + `'s Turn`;
        }
        updateBoard(players[0]);
        updateBoard(players[1]);
        setupListeners();
    }

    const createPlayerSection = function (player) {
        let playerContainer = document.createElement('div');
        let playerTitle = document.createElement('div');
        let playerWrapper = document.createElement('div');
        playerTitle.textContent = player.name + ' Grid';
        playerTitle.classList.add('player-title');
        playerContainer.classList.add('player-container');
        let board = document.createElement('div');
        board.classList.add('board');
        board.classList.add(player.name.toLowerCase().replace(/\s+/g, '-'));
        playerWrapper.append(board);
        playerWrapper.append(playerTitle);
        playerContainer.append(playerWrapper);
        return playerContainer;
    }

    const updateBoard = function (player) {
        let board = document.querySelector('.board' + '.' + player.name.toLowerCase().replace(/\s+/g, '-'));
        board.textContent = "";
        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                let div = document.createElement('div');
                div.classList.add('square');
                div.dataset.x = j;
                div.dataset.y = i;
                if (player.name == players[0].name) {
                    div.dataset.player = 0;
                } else {
                    div.dataset.player = 1;
                }
                //&& player.name != players[1].name
                if (player.gameboard.board[i][j] != null) {
                    div.classList.add('ship');
                }

                if (player.gameboard.missed.has([j, i].toString())) {
                    div.classList.add('missed')
                }
                if (player.gameboard.hits.has([j, i].toString())) {
                    div.classList.remove('ship');
                    div.classList.add('hit');
                }
                board.append(div);
            }
        }
    }

    const computerAIMove = function () {
        let availMoves = [];
        let moves = [];
        let hits = players[1].gameboard.hits;
        let missed = players[1].gameboard.missed;
        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                availMoves.push([j, i]);
            }
        }
        for (const hit of hits) {
            let coord = hit.split(',');
            coord = coord.map((element) => parseInt(element));
            moves.push(coord);
        }
        for (const miss of missed) {
            let coord = miss.split(',');
            coord = coord.map((element) => parseInt(element));
            moves.push(coord);
        }
        for (const move of moves) {
            availMoves.splice(move, -1);
        }

        let index = Math.floor(Math.random() * availMoves.length);
        let coord = availMoves[index];
        gameLoop(1,coord[0],coord[1]);
    }

    const setupListeners = function () {
        let grid = document.querySelectorAll('.player-container .square');
        grid.forEach((square) => {
            square.addEventListener('click', (event) => {
                gameLoop(event.target.dataset.player, event.target.dataset.x, event.target.dataset.y);
                while(currentPlayer == players[1] && !gameOver) {
                    computerAIMove();
                }
            })
        })
    }

    return { loadGame };
})();

domController.loadGame();