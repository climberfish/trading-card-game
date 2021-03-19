export default abstract class Phase {
  private _next?: Phase;

  abstract run(): void;

  next() {
    return this._next;
  }

  setNext(next: Phase) {
    this._next = next;
  }
}
