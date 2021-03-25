import Player from '@/application/Player';
import Phase from '@/application/Phases/Phase';

export enum GameAction { CAST_CARD }

export type ActionObserver = (type: GameAction, game: Game, params: Record<any, any>) => void

export default class Game {
  private _player1: Player;

  private _player2: Player;

  private _currentPlayer: Player;

  private initPipeline: Phase[] = [];

  private runLoop: Phase[] = [];

  private activePhase?: Phase;

  private observers: ActionObserver[];

  constructor(player1: Player, player2: Player, initialObservers: ActionObserver[]) {
    this._player1 = player1;
    this._player2 = player2;
    this._currentPlayer = this._player1;
    this.observers = initialObservers;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get players(): [Player, Player] {
    return [this._player1, this._player2];
  }

  get isFinished(): boolean {
    return this._player1.isDead || this._player2.isDead;
  }

  setInitPipeline(initPhases: Phase[]): void {
    this.initPipeline = initPhases;
  }

  setLoop(loopPhases: Phase[]): void {
    this.runLoop = loopPhases;
  }

  start(): void {
    this.initPipeline.forEach((phase) => phase.run(this));
    [this.activePhase] = this.runLoop;
  }

  nextPhase(): void {
    if (!this.activePhase) return;

    this.activePhase.run(this);
    this.activePhase = this.activePhase.nextPhase;
  }

  emit(action: GameAction, params: object): void {
    this.observers.forEach((observer) => observer(action, this, params));
  }

  switchPlayer() {
    this._currentPlayer = this.otherPlayer();
  }

  otherPlayer() {
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
