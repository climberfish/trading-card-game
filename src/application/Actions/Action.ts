import Game from '../Game';

interface Event {
  emit: () => void;
}

export default abstract class Action {
  // private events: Event[];

  // constructor(events: Event[]) {
  //   this.events = events;
  // }

  protected abstract perform(): void;

  run(game: Game): void {
    // this.events.forEach((event) => event.emit());
    game.$emit(this.constructor.name);
    this.perform();
  }

  runMultipleTimes(game: Game, times: number): void {
    for (let i = 0; i < times; i++) {
      this.run(game);
    }
  }
}
