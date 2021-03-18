import Game from '../Game';

export default class IncreaseMana {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  static builder() {
    return {
      build(game: Game) {
        return new IncreaseMana(game);
      },
    };
  }

  perform(): void {
    this.game.currentPlayer.increaseMana();
  }
}
