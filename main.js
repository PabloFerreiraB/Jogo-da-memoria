// pegando o id="cardboard" no html
const cardBoard = document.querySelector('#cardboard');
// array de imagens
const images = [
    'homer.png',
    'lisa.png',
    'bart.png',
    'maggie.png',
    'marge.png',
    'burns.png'
];

// criando uma variável do tipo let
let cardHTML = '';

// incluindo itens para a variável
images.forEach(img => {
    cardHTML += `
    <div class="memory-card" data-card="${img}">
        <img class="front-face" src="img/${img}">
        <img class="back-face" src="img/js-badge.svg">
    </div>
    `;
});

// incluindo a variável com valores(imgs) no html | somando para duplicar os valores
cardBoard.innerHTML = cardHTML + cardHTML;

/* Fim da renderização HTML */

// pegando todos cards que tem a classe " memory-card "
const cards = document.querySelectorAll('.memory-card');

// variáveis
let firstCard, secondCard;
let lockCard = false;


function flipCard() {
    if (lockCard) return false;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return false;
    }

    secondCard = this;

    checkForMatch();
}


function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch);
}

function disableCards() {
    lockCard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    }, 1000);
}

// gerar cards aleatório
(function shuffle(){
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    });
})();


function resetCards(isMatch = false) {
    if (isMatch) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }

    [firstCard, secondCard, lockCard] = [null, null, false]
}


// para cada card ao click adicionar a função flipCard acima.
cards.forEach(card => card.addEventListener('click', flipCard));