import Player from '../Player';

export default class DealDamageAction {
  constructor(private damage: number, private player: Player) {}

  run(): void {
    this.player.dealDamage(this.damage);
  }
}
