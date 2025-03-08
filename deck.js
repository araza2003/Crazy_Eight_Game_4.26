class Deck {
    constructor() {
        this.cards = [];
        const suits = { "Clubs": "C", "Diamonds": "D", "Hearts": "H", "Spades": "S" };
        const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

        for (let suit in suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suits[suit], rank));
            }
        }
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    drawCard() {
        return this.cards.pop();
    }

    isEmpty() {
        return this.cards.length === 0;
    }
}
