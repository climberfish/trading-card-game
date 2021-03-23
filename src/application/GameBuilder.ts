import Game from '@/application/Game';
import Phase from '@/application/Phases/Phase';
import Player from '@/application/Player';

export default class GameBuilder {
  private players?: [Player, Player];

  private initPipeline: Phase[] = [];

  private runLoop: Phase[] = [];

  withPlayers(player1: Player, player2: Player): GameBuilder {
    this.players = [player1, player2];
    return this;
  }

  withInitPhase(initPhases: Phase[]): GameBuilder {
    this.initPipeline = initPhases;
    return this;
  }

  withLoop(loopPhases: Phase[]): GameBuilder {
    this.runLoop = loopPhases;
    return this;
  }

  build(): Game {
    if (!this.players) throw new Error('Faltando os players');

    const game = new Game(...this.players);
    game.setInitPipeline(this.initPipeline);
    game.setLoop(this.runLoop);
    return game;
  }
}
