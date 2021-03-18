export default class Mana {
  private _max = 0;

  private _current = 0;

  get max() { return this._max; }

  get current() { return this._current; }

  increaseMax(): void {
    this._max++;
  }

  refill(): void {
    this._current = this._max;
  }

  consume(value: number): boolean {
    const canConsume = (this._current >= value);
    if (canConsume) this._current -= value;
    return canConsume;
  }
}
