import Game from '../Game';

export default class SwitchPlayerPhase {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  static builder() {
    return {
      build(game: Game) {
        return new SwitchPlayerPhase(game);
      },
    };
  }

  perform(): void {
    this.game.switchPlayer();
  }
}
