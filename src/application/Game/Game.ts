import Player from '@/application/Player';
import Phase from '../Phases/Phase';

enum GameStatus {
  CREATED,
  RUNNING,
  FINISHED,
}

export default class Game {
  private _player1: Player;

  private _player2: Player;

  private _currentPlayer: Player;

  private initPipeline: Phase[] = [];

  private runLoop: Phase[] = [];

  private activePhase = 0;

  private status: GameStatus;

  constructor(player1: Player, player2: Player) {
    this._player1 = player1;
    this._player2 = player2;
    this._currentPlayer = this._player1;
    this.status = GameStatus.CREATED;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get players(): Player[] {
    return [this._player1, this._player2];
  }

  setInitPipeline(pipeline: Phase[]) {
    this.initPipeline = pipeline;
  }

  setRunLoop(pipeline: Phase[]) {
    this.runLoop = pipeline;
  }

  start(): void {
    if (this.status !== GameStatus.CREATED) return;

    this.initPipeline.forEach((phase) => {
      phase.run();
    });
    this.status = GameStatus.RUNNING;
  }

  nextPhase(): void {
    if (this.status !== GameStatus.RUNNING) return;

    this.runLoop[this.activePhase].run();

    const totalPhases = this.runLoop.length;
    this.activePhase = (this.activePhase + 1) % totalPhases;
  }

  switchPlayer(): void {
    this._currentPlayer = this.otherPlayer();
  }

  private otherPlayer() {
    return this.currentPlayer === this._player1 ? this._player2 : this._player1;
  }

  /*
  run() {
    while(!hasWinner()) {
      beginTurn();
      playCards();
      endTurn();
    }
  }

  playCards() {
    while (currentPlayer.isPlaying) {
      const card = currentPlayer.selectCard()
      currentPlayer.play(card);
    }
  }
  */
}
