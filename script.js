"use strict";
const btn = document.querySelectorAll("button");
const turn = document.querySelector("h2");
let change = 0;
const board = document.querySelector(".board");
const winner = document.querySelector(".winner");
const Losser = document.querySelector(".losser");
let forX = [], forO = [];

// Possible winning combinations
const prob = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// Function to check if a player has won
function checkWinner(playerMoves) {
    return prob.some(combination =>
        combination.every(move => playerMoves.includes(move))
    );
}

// Event listener for each button
btn.forEach((el, index) => {
    el.addEventListener("click", () => {

        // Ignore clicks on already filled buttons
        if (el.innerText !== "") return;

        // X's turn
        if (change == 0) {
            el.innerText = "X";
            forX.push(index + 1);  
            if (checkWinner(forX)) {
                winner.innerText = "X";
                Losser.innerText = "O"
                disableBoard();
                return;
            }
            turn.innerText = "O's TURN";
            change = 1;
        } 
        // O's turn
        else {
            el.innerText = "O";
            forO.push(index + 1); 
            if (checkWinner(forO)) {
                winner.innerText = "O";
                Losser.innerText = "X";
                disableBoard();
                return;
            }
            turn.innerText = "X's TURN";
            change = 0;
        }

        // Check for a draw (if all buttons are clicked and no winner)
        if ([...btn].every(button => button.innerText !== "")) {
            winner.innerText = "";
            Losser.innerText = "";
            winner.innerText = "It's a DRAW!";
        }
    });
});

// Function to disable the board after the game ends
function disableBoard() {
    btn.forEach(button => {
        button.disabled = true;
    });
}

// Optional: Function to reset the game
function resetGame() {
    btn.forEach(button => {
        button.innerText = "";
        button.disabled = false;
    });
    forX = [];
    forO = [];
    winner.innerText = "";
    turn.innerText = "X's TURN";
    change = 0;
}
