import { Component, Input, OnInit } from '@angular/core';

import { ShopCart, ShopCartItem } from './shop-cart';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopCartService } from './shop-cart.service';

const NEW_ITEM_PATH = "newItem";
@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {


  cart = new ShopCart();

  selectedItem: ShopCartItem;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private service: ShopCartService) {
  }

  ngOnInit() {
    this.reloadFromCurrent();
    this.activeRoute.url.subscribe(url => {
      if (url.length > 0) {
        const last = url[url.length - 1];
        if (last.path == NEW_ITEM_PATH) {
          this.selectedItem = this.createNewItem();
        } else if (!isNaN(+last.path)) {
          const idx = +last.path;
          if (this.cart.items.length >= idx) {
            this.selectedItem = this.cart.items[idx];
          }
        }
      }
    });
  }

  reloadFromCurrent() {
    const current = this.service.currentCart
    if (current) {
      this.cart = current;
      this.selectedItem = null;
    }
  }

  createNewItem(): ShopCartItem {
    return new ShopCartItem();
  }

  onNewClick() {
    this.router.navigate(['cart', NEW_ITEM_PATH])
  }

  onItemSelect(item: ShopCartItem) {
    const idx = this.cart.items.indexOf(item);
    if (idx >= 0) {
      this.router.navigate(['cart', `${idx}`])
    }
  }

  onItemSaveClick(item: ShopCartItem) {
    const items = this.cart.items;
    const idx = items.indexOf(items.find(i => i.id == item.id));
    if (idx == -1) {
      items.push(item);
    } else {
      items[idx] = item;
    }
    this.service.currentCart = this.cart;
  }
  onItemRemoveClick(item: ShopCartItem) {
    this.cart.items = this.cart.items.filter(i => i.id != item.id);
    this.service.currentCart = this.cart;

  }
  cleanShoppingCart() {
    this.cart = this.service.currentCart = new ShopCart();
    this.selectedItem = null;
  }

  get showList(): boolean {
    return !this.selectedItem;
  }

  get showDetails(): boolean {
    return Boolean(this.selectedItem);
  }
}
