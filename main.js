import Player from "./player.js";

const domController = (function () {
    const players = [new Player(), new Player()];
    let currentPlayer = players[0];
    const gameOver = false;


    const gameLoop = function (player, x, y) {
        if(!gameOver) {
            if(players[player] == currentPlayer) {
                //player move 
                //check if ship
                //check if all sunk
                //don't switch player until player misses
                //
            } else {
                console.log("not the current player");
            }
        }
        //get input 
        //determine if input is from correct player
        //proceed with move
        //if not correct player don't do anything 

        //solutions put players in array
        // 1. check if input players[dataset.player] is equal to currentplayer
        // 2. add description to player class and check if dataset.player == player.description
        // 

        //player 1 turn 
        //check if all ships are sunk
        // keep going until player misses
        // switch to player 2 
        //move
        //check if all ships are sunk
        //switch to player 1
    }

    const loadGame = function () {
        loadUI();
        setupShips();
        setupListeners();
    }

    const setupShips = function () {
        players[0].gameboard.placeShip([0, 0], 2, false);
        players[0].gameboard.placeShip([0, 2], 2, false);
        players[1].gameboard.placeShip([0, 0], 2, false);
        players[1].gameboard.placeShip([0, 2], 2, false);
    }

    const loadUI = function () {
        let container = document.createElement('div');
        let nav = document.createElement('div');
        let status = document.createElement('div');
        status.textContent = "Player 1's Turn"
        status.classList.add('status');
        nav.classList.add('nav');
        container = createPlayerSection('Player 1', container);
        container = createPlayerSection('Player 2', container);
        container.classList.add('container');
        document.body.append(nav,status, container);
    }

    const createPlayerSection = function (player, container) {
        let playerContainer = document.createElement('div');
        let playerTitle = document.createElement('div');
        let playerWrapper = document.createElement('div');
        playerTitle.textContent = player + ' Grid';
        playerTitle.classList.add('player-title');
        playerContainer.classList.add('player-container');
        playerWrapper = createBoard(playerWrapper, player);
        playerWrapper.append(playerTitle);
        playerContainer.append(playerWrapper);
        container.append(playerContainer);
        return container;
    }

    const createBoard = function (container, player) {
        let board = document.createElement('div');
        board.classList.add('board')
        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                let div = document.createElement('div');
                div.classList.add('square');
                div.dataset.x = j;
                div.dataset.y = i;
                if(player == 'Player 1') {
                    div.dataset.player = 0;
                } else {
                    div.dataset.player = 1;
                }
                board.append(div);
            }
        }
        container.append(board)
        return container;
    }

    const setupListeners =  function () {
        let grid = document.querySelectorAll('.player-container .square');
        grid.forEach((square) => {
            square.addEventListener('click', (event) => {
                gameLoop(event.target.dataset.player, event.target.dataset.x, event.target.dataset.y);
            })
        })
    }

    return { loadGame };
})();

domController.loadGame();