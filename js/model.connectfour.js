"use strict";

//DONE: Think of this model as the game-logic.
//      The model knows everything that is neccessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.

export const model = {

    currentPlayer: "X",
    gameOver: false,
    winner: null,
    winningStones: [],

    rows: 6,
    cols: 7,

    board: []
};


//DONE: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.

model.dispatchPlayerChange = function () {

    document.dispatchEvent(
        new CustomEvent("connectfour:playerchange", {
            detail: {
                player: model.currentPlayer
            }
        })
    );
};

model.dispatchStoneInserted = function () {

    document.dispatchEvent(
        new CustomEvent("connectfour:stoneinserted", {
            detail: {
                board: model.board
            }
        })
    );
};

model.dispatchGameOver = function () {

    document.dispatchEvent(
        new CustomEvent("connectfour:gameover", {
            detail: {
                winner: model.winner,
                winningStones: model.winningStones
            }
        })
    );
};


//DONE: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

model.initBoard = function () {

    model.board = [];

    for (let r = 0; r < model.rows; r++) {

        let row = [];

        for (let c = 0; c < model.cols; c++) {
            row.push(null);
        }

        model.board.push(row);
    }
};


//DONE: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.

model.insertStone = function (col) {

    if (model.gameOver) return;

    for (let row = model.rows - 1; row >= 0; row--) {

        if (model.board[row][col] === null) {

            model.board[row][col] = model.currentPlayer;

            model.dispatchStoneInserted();

            if (model.checkWin(row, col)) {
                model.gameOver = true;
                model.winner = model.currentPlayer;
                model.dispatchGameOver();
            }
            else if (model.checkDraw()) {
                model.gameOver = true;
                model.winner = "draw";
                model.dispatchGameOver();
            }
            else {
                model.changePlayer();
            }

            return;
        }
    }
};


//DONE: Methods to check if the game is over, either by draw or a win.

model.checkDraw = function () {

    for (let r = 0; r < model.rows; r++) {
        for (let c = 0; c < model.cols; c++) {
            if (model.board[r][c] === null) {
                return false;
            }
        }
    }
    return true;
};


model.checkWin = function (row, col) {

    const player = model.currentPlayer;

    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertikal
        [1, 1],   // diagonal links oben nach rechts unten
        [1, -1]   // diagonal rechts oben nach links unten
    ];

    for (let [dr, dc] of directions) {

        const stonesBefore = model.collectWinningDirection(row, col, -dr, -dc, player).reverse();
        const stonesAfter = model.collectWinningDirection(row, col, dr, dc, player);

        const stones = [
            ...stonesBefore,
            { row: row, col: col },
            ...stonesAfter
        ];

        if (stones.length >= 4) {
            model.winningStones = stones.map((stone) => stone.row * model.cols + stone.col);
            return true;
        }
    }

    model.winningStones = [];
    return false;
};

model.collectWinningDirection = function (row, col, dr, dc, player) {

    let r = row + dr;
    let c = col + dc;
    let stones = [];

    while (
        r >= 0 &&
        r < model.rows &&
        c >= 0 &&
        c < model.cols &&
        model.board[r][c] === player
        ) {
        stones.push({ row: r, col: c });
        r += dr;
        c += dc;
    }

    return stones;
};

model.countDirection = function (row, col, dr, dc, player) {

    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (
        r >= 0 &&
        r < model.rows &&
        c >= 0 &&
        c < model.cols &&
        model.board[r][c] === player
        ) {
        count++;
        r += dr;
        c += dc;
    }

    return count;
};


//DONE: Method to change the current player (and dispatch the according event).

model.changePlayer = function () {

    model.currentPlayer = (model.currentPlayer === "X") ? "O" : "X";

    model.dispatchPlayerChange();
};
