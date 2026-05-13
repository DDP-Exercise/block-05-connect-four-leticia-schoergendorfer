"use strict";

//DONE: Optional: Create a console-view to test your Game.

export const consoleView = {

    renderBoard(board) {
        console.clear();

        for (let row = 0; row < board.length; row++) {
            let line = "";

            for (let col = 0; col < board[row].length; col++) {
                line += board[row][col] + " ";
            }

            console.log(line);
        }
    }

};
