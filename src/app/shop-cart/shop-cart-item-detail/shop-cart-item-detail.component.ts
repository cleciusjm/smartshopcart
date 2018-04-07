import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShopCartItem } from '../shop-cart';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shop-cart-item-detail',
  templateUrl: './shop-cart-item-detail.component.html',
  styleUrls: ['./shop-cart-item-detail.component.scss']
})
export class ShopCartItemDetailComponent implements OnInit {

  @Input() item: ShopCartItem;

  @Output() saveClick = new EventEmitter<ShopCartItem>();

  form: FormGroup;

  constructor(private location: Location, private fb: FormBuilder) {

    this.form = fb.group({
      name: ['', Validators.required],
      amount: ['1', Validators.required],
      unitaryPrice: ['0.00', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSaveClick() {
    this.saveClick.emit(this.item);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  get canSave() {
    return this.form.valid;
  }

}
