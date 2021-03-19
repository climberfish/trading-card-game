import Player from '../Player';
import Action from './Action';

export default class SetHealthAction extends Action {
  private health: number;

  private player: Player;

  constructor(player: Player, health: number) {
    super();
    this.health = health;
    this.player = player;
  }

  perform(): void {
    this.player.health = this.health;
  }
}
