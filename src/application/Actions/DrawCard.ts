import Player from '../Player';
import Action from './Action';

export default class DrawCard extends Action {
  private player: Player;

  constructor(player: Player) {
    super();
    this.player = player;
  }

  perform(): void {
    this.player.draw();
  }
}
