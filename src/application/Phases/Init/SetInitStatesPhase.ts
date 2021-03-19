import SetHealthAction from '@/application/Actions/SetHealthAction';
import Game from '@/application/Game';
import Phase from '../Phase';

export default class SetInitStatesPhase extends Phase {
  private health: number;

  private mana: number;

  private game: Game;

  constructor(game: Game, health: number, mana: number) {
    super();
    this.health = health;
    this.mana = mana;
    this.game = game;
  }

  static with({ health = 30, mana = 0 }) {
    return {
      build(game: Game) {
        return new SetInitStatesPhase(game, health, mana);
      },
    };
  }

  run(): void {
    this.game.players.forEach((player) => {
      new SetHealthAction(player, this.health).run(this.game);
      // new Actions.SetMana(player, this.mana);
    });
  }
}
