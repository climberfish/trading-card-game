import Game from '../Game';
import Phase from './Phase';

export default class RefillManaPhase implements Phase {
  run(game: Game): void {
    game.players.forEach((player) => player.refillMana());
  }
}
