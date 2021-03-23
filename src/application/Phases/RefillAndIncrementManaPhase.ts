import Game from '../Game';
import Phase from './Phase';

export default class RefillAndIncrementManaPhase implements Phase {
  run(game: Game): void {
    game.players.forEach((player) => {
      player.increaseMana();
      player.refillMana();
    });
  }
}
