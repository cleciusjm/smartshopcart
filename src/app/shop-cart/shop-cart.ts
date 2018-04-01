export class ShopCart {
  items: ShopCartItem[] = [];

}
export class ShopCartItem {
  name = '';
  unitaryValue = 0.0;
  amount = 1;

  get total() {
    return this.unitaryValue * this.amount;
  }

}
