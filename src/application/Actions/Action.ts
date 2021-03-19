interface Event {
  emit: () => void;
}

export default abstract class Action {
  abstract perform(): void;

  run(): void {
    this.perform();
  }

  runMultipleTimes(times: number): void {
    for (let i = 0; i < times; i++) {
      this.run();
    }
  }
}
