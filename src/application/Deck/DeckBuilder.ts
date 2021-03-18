import { Deck } from '@/application/Deck/Deck';

export interface DeckBuilder {
  build: () => Deck;
}

export class DefaultDeckBuilder implements DeckBuilder {
  build(): Deck {
    return [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8];
  }
}
