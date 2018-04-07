import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShopCartItem } from '../shop-cart';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-cart-item-detail',
  templateUrl: './shop-cart-item-detail.component.html',
  styleUrls: ['./shop-cart-item-detail.component.scss']
})
export class ShopCartItemDetailComponent implements OnInit {

  @Input() item: ShopCartItem;

  @Output() saveClick = new EventEmitter<ShopCartItem>();

  constructor(private location: Location) { }

  ngOnInit() { }

  onSaveClick() {
    this.saveClick.emit(this.item);
    this.goBack();
  }
  goBack() {
    this.location.back();
  }

}
