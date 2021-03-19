import { Card } from '../Deck/Deck';
import Player from '../Player';
import Action from './Action';

export default class CastCardAction extends Action {
  private player: Player;

  private card: Card;

  constructor(player: Player, card: Card) {
    super();
    this.player = player;
    this.card = card;
  }

  perform(): void {
    this.player.selectNextCard(this.card);
  }
}
