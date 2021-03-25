import Card from '@/application/Card';
import { Deck } from '@/application/Deck/Deck';
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

  get isDead(): boolean { return this._health <= 0; }

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

  dealDamage(damage: number): void { this._health -= damage; }

  selectNextCard(card: Card): Card {
    const index = this._hand.indexOf(card);
    if (this._mana.consume(card)) this._hand.splice(index, 1);
    return card;
  }
}
