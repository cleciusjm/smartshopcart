import { Component, Input, OnInit } from '@angular/core';

import { ShopCart, ShopCartItem } from './shop-cart';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  @Input() cart: ShopCart;

  constructor() { }

  ngOnInit() {
  }

  get items() {
    return this.cart.items;
  }

  onNewClick() {
    const item = new ShopCartItem();
    item.name = "Teste " + (this.cart.items.length + 1);
    item.amount = 1;
    item.unitaryValue = Math.round(Math.random() * 1000) / 100;
    this.cart.items.push(item);
  }

}
