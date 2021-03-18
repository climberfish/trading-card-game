import SetHealth from '@/application/Actions/SetHealth';
import Game from '@/application/Game';

export default class SetInitStates {
  private health: number;

  private mana: number;

  private game: Game;

  constructor(game: Game, health: number, mana: number) {
    this.health = health;
    this.mana = mana;
    this.game = game;
  }

  static with({ health = 30, mana = 0 }) {
    return {
      build(game: Game) {
        return new SetInitStates(game, health, mana);
      },
    };
  }

  perform(): void {
    this.game.players.forEach((player) => {
      new SetHealth(player, this.health).perform();
      // new Actions.SetMana(player, this.mana);
    });
  }
}
