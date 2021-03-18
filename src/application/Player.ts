import { Card, Deck } from '@/application/Deck/Deck';
import { DeckBuilder, DefaultDeckBuilder } from '@/application/Deck/DeckBuilder';
import Mana from '@/application/Mana';

export default class Player {
  private _mana: Mana = new Mana();

  private _health = 30;

  private _deck: Deck;

  private _hand: Card[] = [];

  constructor(deckBuilder: DeckBuilder = new DefaultDeckBuilder()) {
    this._deck = deckBuilder.build();
  }

  get currentMana(): number { return this._mana.current; }

  get health(): number { return this._health; }

  get deck(): Deck { return this._deck; }

  get hand(): Card[] { return this._hand; }

  draw(cards: number): void {
    for (let time = 0; time < cards; time++) {
      const card = this._deck.shift();
      if (card !== undefined) this._hand.push(card);
    }
  }

  shuffleDeck(): void {
    const shuffleStrategy = { run: (deck: Deck) => deck };
    this._deck = shuffleStrategy.run(this.deck);
  }

  increaseMana(): void { this._mana.increaseMax(); }

  refillMana(): void { this._mana.refill(); }

  selectNextCard(index: number): Card {
    const [card] = this._hand.splice(index, 1);
    this._mana.consume(card);
    return card;
  }
}
