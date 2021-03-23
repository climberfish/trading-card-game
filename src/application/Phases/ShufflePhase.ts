import { Deck } from '@/application/Deck/Deck';
import Game from '@/application/Game';
import Phase from '@/application/Phases/Phase';

export default class ShufflePhase implements Phase {
  private suffle: (deck: Deck) => Deck;

  constructor(algorithm: (deck: Deck) => Deck) {
    this.suffle = algorithm;
  }

  static noShuffle() {
    return new ShufflePhase((deck) => deck);
  }

  run(game: Game): void {
    game.players.forEach((player) => {
      // eslint-disable-next-line no-param-reassign
      player.deck = this.suffle(player.deck);
    });
  }
}
