class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.imageUrl = this.getCardImageUrl();
    }

    toString() {
        return `${this.rank}${this.suit[0]}`;
    }

    getCardImageUrl() {
        return `https://deckofcardsapi.com/static/img/${this.rank}${this.suit[0]}.png`;
    }
}
