let chips = 1000; // Initial chip count

// Function to create a deck of cards
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to calculate the value of a card
function cardValue(card) {
    if (card.rank === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card.rank)) return 10;
    return parseInt(card.rank);
}

// Function to deal a card
function dealCard() {
    return deck.pop();
}

// Function to update chip total
function updateChipTotal(amount) {
    chips += amount;
    document.getElementById('chip-total').textContent = chips;
}

// Function to display message
function displayMessage(message, color) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = color;
}

// Function to initialize a new game
function initializeGame() {
    deck = createDeck();
    shuffleDeck(deck);
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    document.getElementById('player-hand').innerHTML = '<div class="hand-indicator">Player</div>';
    document.getElementById('dealer-hand').innerHTML = '<div class="hand-indicator">Dealer</div>';
    document.getElementById('player-score').textContent = '';
    document.getElementById('dealer-score').textContent = '';
    document.getElementById('message').textContent = '';
}
// Event listeners
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const betAmountInput = document.getElementById('bet-amount');
        betAmountInput.value = parseInt(betAmountInput.value) + parseInt(chip.value);
    });
});

document.getElementById('place-bet').addEventListener('click', () => {
    const betAmountInput = document.getElementById('bet-amount');
    const betAmount = parseInt(betAmountInput.value);
    if (betAmount <= chips) {
        chips -= betAmount;
        document.getElementById('chip-total').textContent = chips;
        initializeGame();
        dealInitialCards();
    } else {
        displayMessage('Not enough chips!', 'red');
    }
});

document.getElementById('deal-btn').addEventListener('click', () => {
    initializeGame();
    dealInitialCards();
});

document.getElementById('hit-btn').addEventListener('click', () => {
    playerHit();
});

document.getElementById('stand-btn').addEventListener('click', () => {
    dealerPlay();
});

// Function to deal initial cards
function dealInitialCards() {
    for (let i = 0; i < 2; i++) {
        playerHand.push(dealCard());
        dealerHand.push(dealCard());
    }
    updatePlayerScore();
    updateDealerScore();
    renderHands();
    checkBlackjack();
}

// Function to render player and dealer hands
function renderHands() {
    renderHand(playerHand, 'player-hand');
    renderHand(dealerHand, 'dealer-hand');
}

// Function to render a hand
function renderHand(hand, target, isPlayer) {
    const handElement = document.getElementById(target);
    handElement.innerHTML = '';
    hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (isPlayer) {
            cardElement.classList.add('player-card');
        } else {
            cardElement.classList.add('dealer-card');
        }
        const suitIcon = getSuitIcon(card.suit);
        cardElement.innerHTML = `<div class="card-value">${card.rank}</div><div class="card-suit">${suitIcon}</div>`;
        handElement.appendChild(cardElement);
    });
}

// Function to get suit icon
function getSuitIcon(suit) {
    switch (suit) {
        case 'Hearts':
            return '&hearts;';
        case 'Diamonds':
            return '&diams;';
        case 'Clubs':
            return '&clubs;';
        case 'Spades':
            return '&spades;';
        default:
            return '';
    }
}

// Function to update player score
function updatePlayerScore() {
    playerScore = calculateScore(playerHand);
    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
}

// Function to update dealer score
function updateDealerScore() {
    dealerScore = calculateScore(dealerHand);
    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
}

// Function to calculate hand score
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
        score += cardValue(card);
        if (card.rank === 'A') aceCount++;
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function checkBlackjack() {
    if (playerScore === 21 && dealerScore === 21) {
        displayMessage('It\'s a push! Both have Blackjack!', 'orange');
        updateChipTotal(parseInt(document.getElementById('bet-amount').value));
    } else if (playerScore === 21) {
        displayMessage('Blackjack! You win!', 'green');
        updateChipTotal(parseInt(document.getElementById('bet-amount').value) * 3);
    } else if (dealerScore === 21) {
        displayMessage('Dealer has Blackjack! You lose!', 'red');
    }
}

// Function for player to hit
function playerHit() {
    if (playerScore < 21) {
        playerHand.push(dealCard());
        updatePlayerScore();
        renderHands();
        if (playerScore >= 21) {
            endGame();
        }
    }
}

// Function for dealer to play
function dealerPlay() {
    while (dealerScore < 17) {
        dealerHand.push(dealCard());
        updateDealerScore();
        renderHands();
    }
    endGame();
}

// Function to end the game and determine the winner
function endGame() {
    if (playerScore > 21) {
        displayMessage('You busted! Dealer wins!', 'red');
    } else if (dealerScore > 21) {
        displayMessage('Dealer busted! You win!', 'green');
        updateChipTotal(parseInt(document.getElementById('bet-amount').value) * 2);
    } else if (playerScore > dealerScore) {
        displayMessage('You win!', 'green');
        updateChipTotal(parseInt(document.getElementById('bet-amount').value) * 2);
    } else if (playerScore < dealerScore) {
        displayMessage('Dealer wins!', 'red');
    } else {
        displayMessage('It\'s a push!', 'orange');
        updateChipTotal(parseInt(document.getElementById('bet-amount').value));
    }
}