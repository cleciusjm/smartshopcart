import { v4 as uuid } from 'uuid';
export class ShopCart {
  items: ShopCartItem[] = [];

  get total() {
    return this.items.map(i => i.total).reduce((p, c) => p + c, 0);
  }

}
export class ShopCartItem {
  name = '';
  unitaryValue = 0.0;
  amount = 1;

  constructor(public readonly id = uuid()) {
  }

  get total() {
    return this.unitaryValue * this.amount;
  }

}
