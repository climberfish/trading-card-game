import DrawCardAction from '@/application/Actions/DrawCardAction';
import Game from '@/application/Game';
import Phase from '../Phase';

export default class DrawInitialCardsPhase extends Phase {
  private cards: number;

  private game: Game;

  constructor(game: Game, cards: number) {
    super();
    this.cards = cards;
    this.game = game;
  }

  static with(cards: number) {
    return {
      build(game: Game) {
        return new DrawInitialCardsPhase(game, cards);
      },
    };
  }

  run(): void {
    this.game.players.forEach((player) => {
      new DrawCardAction(player).runMultipleTimes(this.game, 3);
    });
  }
}
