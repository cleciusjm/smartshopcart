import { Component } from '@angular/core';

import { ShopCart } from './shop-cart/shop-cart';

@Component({
  selector: 'app-root',
  template: `<app-shop-cart [(cart)]="cart"></app-shop-cart>`
})
export class AppComponent {
  cart = new ShopCart();
}
