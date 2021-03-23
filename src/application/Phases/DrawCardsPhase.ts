import Game from '@/application/Game';
import Phase from '@/application/Phases/Phase';

export default class DrawCardsPhase implements Phase {
  constructor(private cards: number) {}

  static withCards(cards: number) {
    return new DrawCardsPhase(cards);
  }

  run(game: Game): void {
    game.players.forEach((player) => player.draw(this.cards));
  }
}
