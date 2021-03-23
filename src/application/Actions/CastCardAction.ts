import { Card } from '../Deck/Deck';
import Player from '../Player';

export default class CastCardAction {
  private player: Player;

  private card: Card;

  constructor(player: Player, card: Card) {
    this.player = player;
    this.card = card;
  }

  run(): void {
    this.player.selectNextCard(this.card);
  }
}
