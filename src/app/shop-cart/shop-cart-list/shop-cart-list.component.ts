import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShopCart, ShopCartItem } from '../shop-cart';

@Component({
  selector: 'app-shop-cart-list',
  templateUrl: './shop-cart-list.component.html',
  styleUrls: ['./shop-cart-list.component.scss']
})
export class ShopCartListComponent implements OnInit {

  @Input() cart: ShopCart;


  @Output() newClick = new EventEmitter();
  @Output() itemSelect = new EventEmitter();
  @Output() cleanCart = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get items() {
    return (this.cart) ? this.cart.items.reverse() : [];
  }

  get hasItems() {
    return this.cart && this.cart.items.length > 0;
  }

  onNewClick() {
    this.newClick.emit();
  }

  onItemSelect(item: ShopCartItem) {
    this.itemSelect.emit(item);
  }

  cleanShoppingCart() {
    if (confirm('Limpar o carrinho eliminará todos os itens, deseja continuar?')) {
      this.cleanCart.emit();
    }
  }

}
