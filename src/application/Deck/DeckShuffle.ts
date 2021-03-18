import { Deck } from '@/application/Deck/Deck';

interface ShuffleStrategy {
  run: (deck: Deck) => Deck;
}

export class RandomShuffleDeck {
  run(deck: Deck): Deck {
    const shuffled = deck;
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }
}

export class DontShuffleDeck implements ShuffleStrategy {
  run(deck: Deck): Deck {
    return deck;
  }
}
