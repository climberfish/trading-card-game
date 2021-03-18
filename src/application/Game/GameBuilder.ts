import Game from '.';
import PhaseBuilder from '../Phases/PhaseBuilder';
import Player from '../Player';

export default class GameBuilder {
  private initBuilder: PhaseBuilder[] = [];

  private players: [Player, Player] | undefined = undefined;

  withPlayers(player1: Player, player2: Player): GameBuilder {
    this.players = [player1, player2];
    return this;
  }

  withInitPipeline(phaseBuilders: PhaseBuilder[]): GameBuilder {
    this.initBuilder = phaseBuilders;
    return this;
  }

  build() {
    if (!this.players) throw new Error('Missing players before build');

    const game = new Game(...this.players);
    game.setInitPipeline(
      this.initBuilder.map((phaseBuilder) => phaseBuilder.build(game)),
    );
    return game;
  }
}
