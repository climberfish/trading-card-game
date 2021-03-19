import Game from '../Game';
import Phase from './Phase';

export default class IncreaseManaPhase extends Phase {
  private game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  static builder() {
    return {
      build(game: Game) {
        return new IncreaseManaPhase(game);
      },
    };
  }

  run(): void {
    this.game.players.forEach((player) => player.increaseMana());
  }
}
