import { createBoard } from './board.js';

let currentCardCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');

    function startGame() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        const cardCount = currentCardCount || parseInt(prompt("Syötä korttien määrä (parillinen luku 4-16):"), 10);
        if (isNaN(cardCount) || cardCount < 4 || cardCount > 16 || cardCount % 2 !== 0) {
            alert("Korttien määrän tulee olla parillinen luku välillä 4-16.");
            return
        }

        currentCardCount = cardCount;
        createBoard(cardCount);
    }

    restartBtn.addEventListener('click', startGame);
    startGame();
});