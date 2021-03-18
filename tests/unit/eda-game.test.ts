import Game from '@/application/Game';
import GameBuilder from '@/application/Game/GameBuilder';
import DrawInitialCards from '@/application/Phases/Init/DrawInitialCards';
import SetInitStates from '@/application/Phases/Init/SetInitStates';
import Player from '@/application/Player';

describe('Game', () => {
  let player1: Player;
  let player2: Player;
  let game: Game;

  beforeEach(() => {
    player1 = new Player();
    player2 = new Player();
    game = new GameBuilder()
      .withPlayers(player1, player2)
      .withInitPipeline([
        SetInitStates.with({ health: 30 }),
        DrawInitialCards.with(3),
      ])
      .build();
  });

  test.only('Players start with 30 Health and 0 Mana slots', () => {
    game.start();

    expect(player1.health).toBe(30);
    expect(player1.currentMana).toBe(0);
  });

  test.only('Players start with a deck of 20 cards', () => {
    const { deck } = player1;
    expect(deck.length).toBe(20);
  });

  test.only('Players draw 3 cards on game start', () => {
    game.start();

    const { hand: hand1, deck: deck1 } = player1;
    const { hand: hand2, deck: deck2 } = player2;
    expect(hand1.length).toBe(3);
    expect(hand2.length).toBe(3);
    expect(deck1.length).toBe(17);
    expect(deck2.length).toBe(17);
  });

  test('Decrease mana after play', () => {
    game.start();
    const { currentPlayer } = game;
    expect(currentPlayer.currentMana).toBe(0);
    game.beginTurn();
    expect(currentPlayer).toBe(player1);
    expect(currentPlayer.currentMana).toBe(1);
    player1.selectNextCard(2);
    expect(currentPlayer.currentMana).toBe(0);
  });

  test('Change player after turn', () => {
    const { currentPlayer } = game;
    expect(currentPlayer).toBe(player1);
    game.start();
    expect(currentPlayer).toBe(player1);
    game.endTurn();
    expect(currentPlayer).toStrictEqual(player2);
  });

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
