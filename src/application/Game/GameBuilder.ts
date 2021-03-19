import Game from '.';
import Phase from '../Phases/Phase';
import PhaseBuilder from '../Phases/PhaseBuilder';
import Player from '../Player';

export default class GameBuilder {
  private initBuilders: PhaseBuilder[] = [];

  private runBuilders: PhaseBuilder[] = [];

  private players: [Player, Player] | undefined = undefined;

  withPlayers(player1: Player, player2: Player): GameBuilder {
    this.players = [player1, player2];
    return this;
  }

  withInitPipeline(phaseBuilders: PhaseBuilder[]): GameBuilder {
    this.initBuilders = phaseBuilders;
    return this;
  }

  withRunLoop(phaseBuilders: PhaseBuilder[]): GameBuilder {
    this.runBuilders = phaseBuilders;
    return this;
  }

  build() {
    if (!this.players) throw new Error('Missing players before build');

    const game = new Game(...this.players);
    // const initPipeline = this.pipelineFromBuilders(this.initBuilders, game);
    // const runLoop = this.pipelineFromBuilders(this.runBuilders, game);
    const [initPipeline, runLoop] = this.gamePhases(game);
    game.setInitPipeline(initPipeline);
    game.setRunLoop(runLoop);
    return game;
  }

  private gamePhases(game: Game) {
    const initPipeline = this.pipelineFromBuilders(this.initBuilders, game);
    const runLoop = this.pipelineFromBuilders(this.runBuilders, game);
    this.connectPipelines(initPipeline, runLoop);
    return [initPipeline, runLoop];
  }

  private connectPipelines(initPipeline: Phase[], runLoop: Phase[]) {
    const lastInitPhase = initPipeline[initPipeline.length - 1];
    const lastRunPhase = runLoop[runLoop.length - 1];
    const firstRunPhase = runLoop[0];
    lastInitPhase.setNext(firstRunPhase);
    lastRunPhase.setNext(firstRunPhase);
  }

  private pipelineFromBuilders(builders: PhaseBuilder[], game: Game) {
    const pipeline = builders.map((builder) => builder.build(game));
    for (let k = 0; k < pipeline.length; k++) {
      pipeline[k].setNext(pipeline[k + 1]);
    }
    return pipeline;
  }
}
