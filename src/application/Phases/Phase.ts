import Game from '@/application/Game';

interface Phase {
  run(game: Game): void;
  nextPhase?: Phase;
}

export default Phase;
