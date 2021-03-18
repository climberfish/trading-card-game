import DrawCard from '@/application/Actions/DrawCard';
import Game from '@/application/Game';

export default class DrawInitialCards {
  private cards: number;

  private game: Game;

  constructor(game: Game, cards: number) {
    this.cards = cards;
    this.game = game;
  }

  static with(cards: number) {
    return {
      build(game: Game) {
        return new DrawInitialCards(game, cards);
      },
    };
  }

  perform(): void {
    this.game.players.forEach((player) => {
      new DrawCard(player).performTimes(3);
    });
  }
}
