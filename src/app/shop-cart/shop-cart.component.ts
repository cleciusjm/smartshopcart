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
        const last = url[url.length - 1]
        if (last.path == NEW_ITEM_PATH) {
          this.selectedItem = this.createNewItem();
        } else if (!isNaN(+last.path)) {
          const idx = +last.path;
          if (this.cart.items.length >= idx) {
            this.selectedItem = this.cart.items[idx];
          }
        }

      }
    })
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
    if (idx > 0) {
      this.router.navigate(['cart', `${idx}`])
    }
  }

  onItemSaveClick(item: ShopCartItem) {
    this.cart.items.push(item);
    this.service.currentCart = this.cart;
  }

  get showList(): boolean {
    return !this.selectedItem;
  }

  get showDetails(): boolean {
    return Boolean(this.selectedItem);
  }
}
