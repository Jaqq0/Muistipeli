import { createCardElement} from './card.js';

const allCards = [
    'cards/card1.png',
    'cards/card2.png',
    'cards/card3.png',
    'cards/card4.png',
    'cards/card5.png',
    'cards/card6.png',
    'cards/card7.png',
    'cards/card8.png',
    'cards/card9.png',
    'cards/card10.png',
    'cards/card11.png',
    'cards/card12.png',
    'cards/card13.png',
    'cards/card14.png',
    'cards/card15.png',
    'cards/card16.png'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesfound = 0;
let totalPairs = 0;
let tries = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchesfound = 0;
    tries = 0;
    totalPairs = cardCount / 2;

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
    
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);

    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', handleCardFlip);
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(event) {
    const cardElement = event.currentTarget;

    if (lockBoard) return;
    if (cardElement === firstCard) return;

    cardElement.classList.add('flipped');

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true;
    tries++;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.style.pointerEvents = 'none';
    secondCard.style.pointerEvents = 'none';

    matchesfound++;
    resetBoard();

    if (matchesfound === totalPairs) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = `Voitit pelin ${tries} yrityksellä!`;
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}