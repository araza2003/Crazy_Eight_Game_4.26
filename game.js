class CrazyEightsGame {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();

        this.player = new Player("You");
        this.computer = new Computer();

        this.discardPile = [this.deck.drawCard()];
        this.initGame();
    }

    initGame() {
        // Deal 7 cards to each player
        for (let i = 0; i < 7; i++) {
            this.player.addCard(this.deck.drawCard());
            this.computer.addCard(this.deck.drawCard());
        }

        this.updateDisplay();
    }

    updateDisplay() {
        this.player.updateHandDisplay();
        this.computer.updateHandDisplay();
        this.updateDiscardPile();
    }

    updateDiscardPile() {
        document.getElementById("discard-card").innerHTML = "";
        const topDiscard = document.createElement("img");
        topDiscard.classList.add("card");
        topDiscard.src = this.discardPile[this.discardPile.length - 1].imageUrl;
        document.getElementById("discard-card").appendChild(topDiscard);
    }

    playCard(card) {
        const topCard = this.discardPile[this.discardPile.length - 1];

        if (card.rank === "8" || card.suit === topCard.suit || card.rank === topCard.rank) {
            this.player.removeCard(card);
            this.discardPile.push(card);
            this.updateDisplay();

            if (this.player.hand.length === 0) {
                alert("You win!");
                this.restartGame();
                return;
            }

            setTimeout(() => this.computerTurn(), 1000);
        } else {
            alert("Invalid move! Try again.");
        }
    }

    computerTurn() {
        const topCard = this.discardPile[this.discardPile.length - 1];
        const playedCard = this.computer.playTurn(topCard, this.deck);

        if (playedCard) {
            this.discardPile.push(playedCard);
        } else if (!this.deck.isEmpty()) {
            this.computer.addCard(this.deck.drawCard());
        }

        this.updateDisplay();

        if (this.computer.hand.length === 0) {
            alert("Computer wins!");
            this.restartGame();
        }
    }

    restartGame() {
        setTimeout(() => new CrazyEightsGame(), 1000);
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    addCard(card) {
        this.hand.push(card);
    }

    removeCard(card) {
        this.hand = this.hand.filter(c => c !== card);
    }

    updateHandDisplay() {
        const playerCardsDiv = document.getElementById("player-cards");
        playerCardsDiv.innerHTML = "";

        this.hand.forEach(card => {
            const cardImg = document.createElement("img");
            cardImg.classList.add("card");
            cardImg.src = card.imageUrl;
            cardImg.onclick = () => game.playCard(card);
            playerCardsDiv.appendChild(cardImg);
        });
    }
}

class Computer extends Player {
    constructor() {
        super("Computer");
    }

    playTurn(topCard, deck) {
        for (let i = 0; i < this.hand.length; i++) {
            let card = this.hand[i];
            if (card.rank === "8" || card.suit === topCard.suit || card.rank === topCard.rank) {
                this.hand.splice(i, 1);
                return card;
            }
        }
        return null;
    }

    updateHandDisplay() {
        const computerCardsDiv = document.getElementById("computer-cards");
        computerCardsDiv.innerHTML = "";

        this.hand.forEach(() => {
            const hiddenCard = document.createElement("img");
            hiddenCard.classList.add("card");
            hiddenCard.src = "https://deckofcardsapi.com/static/img/back.png"; // Face-down card
            computerCardsDiv.appendChild(hiddenCard);
        });
    }
}

document.getElementById("draw-card-btn").onclick = function () {
    if (!game.deck.isEmpty()) {
        game.player.addCard(game.deck.drawCard());
        game.updateDisplay();
    }
};

let game = new CrazyEightsGame();
