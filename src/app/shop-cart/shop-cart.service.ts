import { Injectable } from '@angular/core';
import { ShopCart, ShopCartItem } from './shop-cart';
const CURRENT_CARD_KEY = 'smartGroceryCart.currentCart'
@Injectable()
export class ShopCartService {

  constructor() { }

  get currentCart() {
    return this.fromPersistent(localStorage.getItem(CURRENT_CARD_KEY));
  }

  set currentCart(cart: ShopCart) {
    localStorage.setItem(CURRENT_CARD_KEY, this.toPersistent(cart));
  }

  private toPersistent(cart: ShopCart): any {
    if (cart) {
      return JSON.stringify(Object.assign({}, cart, {
        items: cart.items.map(i => Object.assign({}, i))
      }));
    } else { return null; }
  }

  private fromPersistent(jsonStr: any): ShopCart {
    if (jsonStr) {
      try {
        const json = JSON.parse(jsonStr);
        return Object.assign(new ShopCart(), json, {
          items: json.items ? json.items.map(ij => Object.assign(new ShopCartItem(), ij)) : []
        });
      } catch (e) {
        console.error(e);
        return null;
      }
    } else { return null; }
  }

}
