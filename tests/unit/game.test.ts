import Game from '@/application/Game';
import GameBuilder from '@/application/GameBuilder';
import DrawCardsPhase from '@/application/Phases/DrawCardsPhase';
import SetInitStatsPhase from '@/application/Phases/SetInitStatsPhase';
import ShufflePhase from '@/application/Phases/ShufflePhase';
import SwitchPlayerPhase from '@/application/Phases/SwitchPlayerPhase';
import RefillAndIncrementManaPhase from '@/application/Phases/RefillAndIncrementManaPhase';
import Player from '@/application/Player';
import CastCardAction from '@/application/Actions/CastCardAction';
import Card from '@/application/Card';

describe('Game', () => {
  let player1: Player;
  let player2: Player;
  let game: Game;

  beforeEach(() => {
    player1 = new Player();
    player2 = new Player();
    game = new GameBuilder()
      .withPlayers(player1, player2)
      // .withConfigs({ maxMana: 10 })
      .withInitPhase([
        SetInitStatsPhase.with({ health: 30, mana: 0 }),
        ShufflePhase.noShuffle(),
        DrawCardsPhase.withCards(3),
      ])
      .withLoop([
        new RefillAndIncrementManaPhase(),
        new SwitchPlayerPhase(),
        DrawCardsPhase.withCards(1),
      ])
      .build();
  });

  test('Players start with 30 Health and 0 Mana slots', () => {
    game.start();

    expect(player1.health).toBe(30);
    expect(player1.currentMana).toBe(0);
  });

  test('Players start with a deck of 20 cards', () => {
    const { deck } = player1;
    expect(deck.length).toBe(20);
  });

  test('Players draw 3 cards on game start', () => {
    const { hand: hand1, deck: deck1 } = player1;
    const { hand: hand2, deck: deck2 } = player2;
    game.start();

    expect(hand1.length).toBe(3);
    expect(hand2.length).toBe(3);
    expect(deck1.length).toBe(17);
    expect(deck2.length).toBe(17);
  });

  test('Increase and fill mana at start of turn', () => {
    game.start();

    expect(player1.maxMana).toBe(0);
    expect(player2.maxMana).toBe(0);
    expect(player1.currentMana).toBe(0);
    expect(player2.currentMana).toBe(0);

    game.nextPhase();

    expect(player1.maxMana).toBe(1);
    expect(player2.maxMana).toBe(1);
    expect(player1.currentMana).toBe(1);
    expect(player2.currentMana).toBe(1);
  });

  test('Start with player1', () => {
    game.start();

    expect(game.currentPlayer).toBe(player1);
  });

  test('Change player after first card phase', () => {
    game.start();
    game.nextPhase();
    // Skip card casting
    game.nextPhase();

    expect(game.currentPlayer).toBe(player2);
  });

  test('Decrease mana and deal damage after play', () => {
    const { hand } = player1;
    game.start();
    game.nextPhase();

    expect(game.currentPlayer.currentMana).toBe(1);
    expect(player2.health).toBe(30);

    const card = hand.find(({ cost }) => cost === 1) as Card;
    new CastCardAction(player1, card).run(game);

    expect(hand).not.toContain(card);
    expect(game.currentPlayer.currentMana).toBe(0);
    expect(player2.health).toBe(29);
  });

  test('Cannot play card if cost is greater than current mana', () => {
    const { hand } = player1;
    game.start();
    game.nextPhase();
    player1.draw(2);

    expect(game.currentPlayer.currentMana).toBe(1);

    const card = hand.find(({ cost }) => cost === 2) as Card;
    new CastCardAction(player1, card).run(game);

    expect(hand).toContain(card);
    expect(game.currentPlayer.currentMana).toBe(1);
  });

  test('Player draws the card from top of his deck', () => {
    const { hand: hand1, deck: deck1 } = player1;
    game.start();

    expect(hand1.length).toBe(3);
    expect(deck1.length).toBe(17);
    const [firstCard] = deck1;

    game.nextPhase();
    game.nextPhase();
    game.nextPhase();

    expect(hand1.length).toBe(4);
    expect(deck1.length).toBe(16);
    expect(hand1).toContain(firstCard);
  });

  test('Game finishes and Player Dies if health is lower than or equal 0', () => {
    const { hand } = player1;
    game.start();
    game.nextPhase();
    player2.health = 1;

    const card = hand.find(({ cost }) => cost === 1) as Card;
    new CastCardAction(player1, card).run(game);

    expect(player2.isDead).toBe(true);
    expect(game.isFinished).toBe(true);
  });
});
