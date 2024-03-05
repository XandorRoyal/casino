let chips = parseInt(localStorage.getItem("chips")) || 1000;
let gameEnded = true;
let betLocked = false;
let canDouble = false;
let canSplit = false;

function updateChipTotal(amount) {
    chips += amount;
    localStorage.setItem("chips", chips);
    document.getElementById('chip-total').textContent = chips;
}

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

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function cardValue(card) {
    if (card.rank === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card.rank)) return 10;
    return parseInt(card.rank);
}

function dealCard() {
    return deck.pop();
}

function displayMessage(message, color) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = color;
}

function initializeGame() {
    deck = createDeck();
    shuffleDeck(deck);
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    gameEnded = false;
    document.getElementById('player-hand').innerHTML = '<div class="hand-indicator">Player</div>';
    document.getElementById('dealer-hand').innerHTML = '<div class="hand-indicator">Dealer</div>';
    document.getElementById('player-score').textContent = '';
    document.getElementById('dealer-score').textContent = '';
    document.getElementById('message').textContent = '';
    canDouble = true;
    canSplit = false;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('place-bet').addEventListener('click', () => {
        if (!gameEnded && !betLocked) {
            console.log("hello!")
            return displayMessage('Invalid bet or game already started!', 'red');
        }
        const betAmountInput = document.getElementById('bet-amount');
        const betAmount = parseInt(betAmountInput.value);
        if (betAmount <= 1000 && betAmount > 0) {
            chips -= betAmount;
            document.getElementById('chip-total').textContent = chips;
            betAmountInput.disabled = true;
            canDouble = true;
            canSplit = false;
            betLocked = true;
            document.getElementById('deal-btn').style.display = 'inline-block';
        } else {
            console.log("hello!")
            displayMessage('Invalid bet amount or game already started!', 'red');
        }
    });

    document.getElementById('deal-btn').addEventListener('click', () => {
        if (!betLocked) {
            displayMessage('Place a bet first!', 'red');
            return;
        }
        if (!gameEnded) {
            return;
        }
        initializeGame();
        dealInitialCards();
        document.getElementById('deal-btn').style.display = 'none';
        document.getElementById('hit-btn').style.display = 'inline-block';
        document.getElementById('stand-btn').style.display = 'inline-block';
        if (canDouble) {
            document.getElementById('double-btn').style.display = 'inline-block';
        }
        if (canSplit) {
            document.getElementById('split-btn').style.display = 'inline-block';
        }
    });

    document.getElementById('hit-btn').addEventListener('click', () => {
        if (!gameEnded) playerHit();
    });

    document.getElementById('stand-btn').addEventListener('click', () => {
        if (!gameEnded) dealerPlay();
    });

    document.getElementById('double-btn').addEventListener('click', () => {
        if (gameEnded || !canDouble) {
            return displayMessage('Invalid action!', 'red');
        }
        const betAmount = parseInt(document.getElementById('bet-amount').value);
        if (betAmount > chips) {
            return displayMessage('Not enough chips!', 'red');
        }
        chips -= betAmount;
        document.getElementById('chip-total').textContent = chips;
        document.getElementById('bet-amount').value = betAmount * 2;
        playerHand.push(dealCard());
        updatePlayerScore();
        renderHands();
        dealerHand.push(dealCard());
        updateDealerScore();
        endGame();
    });
    document.getElementById('split-btn').addEventListener('click', () => {
        if (!gameEnded || !canSplit) return;
        const betAmountInput = document.getElementById('bet-amount');
        const betAmount = parseInt(betAmountInput.value);
        if (betAmount <= chips) {
            chips -= betAmount;
            document.getElementById('chip-total').textContent = chips;
            betAmountInput.value *= 2;
            canSplit = false;
            betLocked = true;
            splitCards();
        } else {
            displayMessage('Not enough chips for splitting!', 'red');
        }
    });
});

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

function renderHands() {
    renderHand(playerHand, 'player-hand', true);
    renderHand(dealerHand, 'dealer-hand', false);
}

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

function updatePlayerScore() {
    playerScore = calculateScore(playerHand);
    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
}

function updateDealerScore() {
    dealerScore = calculateScore(dealerHand);
    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
}

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
        endGame();
    } else if (playerScore === 21) {
        displayMessage('Blackjack! You win!', 'green');
        updateChipTotal(parseInt(document.getElementById('bet-amount').value) * 3);
        endGame();
    } else if (dealerScore === 21) {
        displayMessage('Dealer has Blackjack! You lose!', 'red');
        endGame();
    }
}

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

function dealerPlay() {
    while (dealerScore < 17) {
        dealerHand.push(dealCard());
        updateDealerScore();
        renderHands();
    }
    endGame();
}

function endGame() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    gameEnded = true;
    betLocked = false;
    document.getElementById('bet-amount').disabled = false;
    canDouble = false;
    canSplit = false;
    document.getElementById('hit-btn').style.display = 'none';
    document.getElementById('stand-btn').style.display = 'none';
    document.getElementById('double-btn').style.display = 'none';
    document.getElementById('split-btn').style.display = 'none';
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

function splitCards() {
    const firstCard = playerHand[0];
    const secondCard = playerHand[1];
    if (firstCard.rank === secondCard.rank) {
        playerHand = [firstCard, dealCard()];
        dealerHand = [secondCard, dealCard()];
        updatePlayerScore();
        updateDealerScore();
        renderHands();
        canSplit = false;
    } else {
        displayMessage('You cannot split these cards!', 'red');
    }
}
