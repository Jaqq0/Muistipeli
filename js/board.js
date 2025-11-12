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

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export function createBoard(cardCount) {
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
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
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}