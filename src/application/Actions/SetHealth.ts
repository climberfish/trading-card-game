import Player from '../Player';

export default class SetHealth {
  private health: number;

  private player: Player;

  constructor(player: Player, health: number) {
    this.health = health;
    this.player = player;
  }

  perform(): void {
    this.player.health = this.health;
  }
}
