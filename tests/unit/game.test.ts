import Game from '@/application/Game';
import GameBuilder from '@/application/GameBuilder';
import DrawCardsPhase from '@/application/Phases/DrawCardsPhase';
import SetInitStatsPhase from '@/application/Phases/SetInitStatsPhase';
import ShufflePhase from '@/application/Phases/ShufflePhase';
import IncreaseMaxManaPhase from '@/application/Phases/IncreaseMaxManaPhase';
import Player from '@/application/Player';
import RefillManaPhase from '@/application/Phases/RefillManaPhase';

describe('Game', () => {
  let player1: Player;
  let player2: Player;
  let game: Game;

  beforeEach(() => {
    player1 = new Player();
    player2 = new Player();
    // game = new Game(player1, player2);
    game = new GameBuilder()
      .withPlayers(player1, player2)
      // .withConfigs({ maxMana: 10 })
      .withInitPhase([
        SetInitStatsPhase.with({ health: 30, mana: 0 }),
        ShufflePhase.noShuffle(),
        DrawCardsPhase.withCards(3),
      ])
      .withLoop([
        new IncreaseMaxManaPhase(),
        new RefillManaPhase(),
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

  test('Increase mana at start of turn', () => {
    game.start();

    expect(player1.maxMana).toBe(0);
    expect(player2.maxMana).toBe(0);

    game.nextPhase();

    expect(player1.maxMana).toBe(1);
    expect(player2.maxMana).toBe(1);
  });

  test('Fill mana at start of turn', () => {
    game.start();

    expect(player1.currentMana).toBe(0);
    expect(player2.currentMana).toBe(0);

    game.nextPhase();
    game.nextPhase();

    expect(player1.currentMana).toBe(1);
    expect(player2.currentMana).toBe(1);
  });

  // test('Decrease mana after play', () => {
  //   game.start();
  //   const { currentPlayer } = game;
  //   expect(currentPlayer.currentMana).toBe(0);
  //   game.beginTurn();
  //   expect(currentPlayer).toBe(player1);
  //   expect(currentPlayer.currentMana).toBe(1);
  //   player1.selectNextCard(2);
  //   expect(currentPlayer.currentMana).toBe(0);
  // });

  // test('Change player after turn', () => {
  //   const { currentPlayer } = game;
  //   expect(currentPlayer).toBe(player1);
  //   game.start();
  //   expect(currentPlayer).toBe(player1);
  //   game.endTurn();
  //   expect(currentPlayer).toStrictEqual(player2);
  // });

  // test('', () => {
  //   const game = new Game(player1, player2);
  //   game.start();
  //   const { currentPlayer } = game;
  //   expect(currentPlayer.currentMana).toBe(0);
  //   game.beginTurn();
  //   expect(currentPlayer).toBe(player1);
  //   expect(currentPlayer.currentMana).toBe(1);
  //   // const card = player1.selectNextCard(2);
  //   player1.nextCardStrategy = function*()
  //   game.playCards();
  //   game.endTurn();
  //   expect(currentPlayer.health).toBe(30 - card);
  // });
});
