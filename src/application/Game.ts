import Player from '@/application/Player';

export default class Game {
  private _player1: Player;

  private _player2: Player;

  private _currentPlayer: Player;

  constructor(player1: Player, player2: Player) {
    this._player1 = player1;
    this._player2 = player2;
    this._currentPlayer = this._player1;
  }

  get currentPlayer() { return this._currentPlayer; }

  start(): void {
    this._player1.shuffleDeck();
    this._player1.draw(3);
    this._player2.shuffleDeck();
    this._player2.draw(3);
  }

  beginTurn(): void {
    this.currentPlayer.increaseMana();
    this.currentPlayer.refillMana();
  }

  endTurn(): void {
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
