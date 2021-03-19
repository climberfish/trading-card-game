import Game from '../Game';
import Phase from './Phase';

export default class SwitchPlayerPhase extends Phase {
  private game: Game;

  constructor(game: Game) {
    super();
    this.game = game;
  }

  static builder() {
    return {
      build(game: Game) {
        return new SwitchPlayerPhase(game);
      },
    };
  }

  run(): void {
    this.game.switchPlayer();
  }
}
