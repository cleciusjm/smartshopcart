import { Component, Input, OnInit } from '@angular/core';
import { ShopCartItem } from '../shop-cart/shop-cart';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() item: ShopCartItem;

  constructor() { }

  ngOnInit() {
  }

}
