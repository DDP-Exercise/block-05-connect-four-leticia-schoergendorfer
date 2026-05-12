"use strict";

//DONE: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.

export const polishedView = {

    init() {
        this.boardElement = document.getElementById("board");
        this.playerElement = document.getElementById("current-player");
        this.messageElement = document.getElementById("message");
    },


//DONE: Update the field. Show the whole battlefield with all the stones
//      that are already played.

    renderBoard(board) {
        this.boardElement.innerHTML = "";

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {

                const cell = document.createElement("div");
                cell.classList.add("cell");

                let value = board[row][col];

                if (value === "X") {
                    cell.textContent = "X";
                    cell.classList.add("player1");
                }

                if (value === "O") {
                    cell.textContent = "O";
                    cell.classList.add("player2");
                }

                this.boardElement.appendChild(cell);
            }
        }
    },


//DONE: Show the current player

    showCurrentPlayer(player) {
        this.playerElement.textContent = "Current Player: " + player;
    },


//DONE: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.

    showGameOver(winner) {
        if (winner === "draw") {
            this.messageElement.textContent = "Game Over - Draw!";
        } else {
            this.messageElement.textContent = "Winner: " + winner;
        }
    },

    highlightWinningStones(positions) {
        const cells = this.boardElement.children;

        for (let i = 0; i < positions.length; i++) {
            cells[positions[i]].classList.add("winner");
        }
    }
};
