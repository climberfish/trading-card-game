import Game from '@/application/Game';

interface Phase {
  run(game: Game): void;
}

export default Phase;
