import { createBoard } from './board.js';

let currentCardCount = 16;

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const cardCountSelect = document.getElementById('card-count');

    function startGame() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        const cardCount = parseInt(cardCountSelect.value, 10);
        currentCardCount = cardCount

        currentCardCount = cardCount;
        createBoard(cardCount);
    }

    restartBtn.addEventListener('click', startGame);
    cardCountSelect.addEventListener('change', startGame);
});