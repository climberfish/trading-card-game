import Game from '../Game';

export default class IncreaseManaPhase {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  static builder() {
    return {
      build(game: Game) {
        return new IncreaseManaPhase(game);
      },
    };
  }

  perform(): void {
    this.game.players.forEach((player) => player.increaseMana());
  }
}
