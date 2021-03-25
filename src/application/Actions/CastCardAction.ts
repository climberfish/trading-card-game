import Card from '@/application/Card';
import Game, { GameAction } from '@/application/Game';
import Player from '../Player';

export default class CastCardAction {
  private player: Player;

  private card: Card;

  constructor(player: Player, card: Card) {
    this.player = player;
    this.card = card;
  }

  run(game: Game): void {
    this.player.selectNextCard(this.card);
    game.emit(GameAction.CAST_CARD, { card: this.card });
  }
}
