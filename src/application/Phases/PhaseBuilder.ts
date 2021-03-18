import Game from '../Game';
import Phase from './Phase';

export default interface PhaseBuilder {
  build: (game: Game) => Phase;
}
