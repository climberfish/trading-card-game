import Card from '@/application/Card';

export default class Mana {
  private _max = 0;

  private _current = 0;

  get max() { return this._max; }

  get current() { return this._current; }

  increase(): void {
    this._max++;
  }

  refill(): void {
    this._current = this._max;
  }

  consume({ cost }: Card): boolean {
    const canConsume = (this._current >= cost);
    if (canConsume) this._current -= cost;
    return canConsume;
  }
}
