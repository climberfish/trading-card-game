export default abstract class Action {
  // constructor(event_type)

  abstract perform(): void;

  performTimes(times: number): void {
    for (let i = 0; i < times; i++) {
      this.perform();
    }
  }
}
