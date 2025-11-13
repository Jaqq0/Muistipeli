export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;

    const front = document.createElement('div');
    front.classList.add('front');
    const img = document.createElement('img');
    img.src = card;
    front.appendChild(img);

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '?';

    cardElement.appendChild(front);
    cardElement.appendChild(back);

    return cardElement;
}

