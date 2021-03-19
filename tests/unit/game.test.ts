import CastCard from '@/application/Actions/CastCard';
import Game from '@/application/Game';
import GameBuilder from '@/application/Game/GameBuilder';
import IncreaseMana from '@/application/Phases/IncreaseMana';
import DrawInitialCards from '@/application/Phases/Init/DrawInitialCards';
import SetInitStates from '@/application/Phases/Init/SetInitStates';
import SwitchPlayer from '@/application/Phases/SwitchPlayer';
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
      .withRunLoop([
        // RestoreMana.builder(),
        IncreaseMana.builder(),
        // CastCards.builder(),
        SwitchPlayer.builder(),
        // CastCards.builder(),
        // AttackPhase.builder(),
      ])
      .build();
  });

  test('Players start with 30 Health and 0 Mana slots', () => {
    game.start();

    expect(player1.health).toBe(30);
    expect(player1.currentMana).toBe(0);

    expect(player2.health).toBe(30);
    expect(player2.currentMana).toBe(0);
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

    expect(player1.currentMana).toBe(0);
    expect(player2.currentMana).toBe(0);

    game.nextPhase();

    expect(player1.currentMana).toBe(1);
    expect(player2.currentMana).toBe(1);
  });

  test('Start with player1', () => {
    game.start();

    expect(game.currentPlayer).toBe(player1);
  });

  test('Decrease mana after play', () => {
    game.start();
    game.nextPhase();
    new CastCard(player1, 2).perform();

    expect(game.currentPlayer.currentMana).toBe(0);
  });

  test('Change player after first card phase', () => {
    game.start();
    game.nextPhase();
    // Skip card casting
    game.nextPhase();

    expect(game.currentPlayer).toBe(player2);
  });
});
