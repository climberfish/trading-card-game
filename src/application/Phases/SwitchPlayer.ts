import Game from '../Game';

export default class SwitchPlayer {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  static builder() {
    return {
      build(game: Game) {
        return new SwitchPlayer(game);
      },
    };
  }

  perform(): void {
    this.game.switchPlayer();
  }
}
