import Game from '@/application/Game';
import Phase from '@/application/Phases/Phase';

export default class SetInitStatsPhase implements Phase {
  constructor(private health: number, private mana: number) {}

  static with({ health = 0, mana = 0 }) {
    return new SetInitStatsPhase(health, mana);
  }

  run(game: Game): void {
    game.players.forEach((player) => {
      // eslint-disable-next-line no-param-reassign
      player.health = this.health;
    });
  }
}
