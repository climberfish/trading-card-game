import Game from '../Game';
import Phase from './Phase';

export default class IncreaseMaxManaPhase implements Phase {
  run(game: Game): void {
    game.players.forEach((player) => player.increaseMana());
  }
}
