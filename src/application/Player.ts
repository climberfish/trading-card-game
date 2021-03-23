import { Card, Deck } from '@/application/Deck/Deck';
import { DeckBuilder, DefaultDeckBuilder } from '@/application/Deck/DeckBuilder';
import Mana from '@/application/Mana';

export default class Player {
  private _mana: Mana = new Mana();

  private _health = 0;

  private _deck: Deck;

  private _hand: Card[] = [];

  constructor(deckBuilder: DeckBuilder = new DefaultDeckBuilder()) {
    this._deck = deckBuilder.build();
  }

  get maxMana(): number { return this._mana.max; }

  get currentMana(): number { return this._mana.current; }

  set health(health: number) { this._health = health; }

  get health(): number { return this._health; }

  set deck(deck: Deck) { this._deck = deck; }

  get deck(): Deck { return this._deck; }

  get hand(): Card[] { return this._hand; }

  draw(cards: number): void {
    const cardsDrawn = this._deck.splice(0, cards);
    this._hand.push(...cardsDrawn);
  }

  shuffleDeck(): void {
    const shuffleStrategy = { run: (deck: Deck) => deck };
    this._deck = shuffleStrategy.run(this.deck);
  }

  increaseMana(): void { this._mana.increase(); }

  refillMana(): void { this._mana.refill(); }

  selectNextCard(index: number): Card {
    const [card] = this._hand.splice(index, 1);
    this._mana.consume(card);
    return card;
  }
}
