import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ShopCartItem } from '../shop-cart';

@Component({
  selector: 'app-shop-cart-item-detail',
  templateUrl: './shop-cart-item-detail.component.html',
  styleUrls: ['./shop-cart-item-detail.component.scss']
})
export class ShopCartItemDetailComponent implements OnInit {

  @Input() showRemove = false;
  @Output() saveClick = new EventEmitter<ShopCartItem>();
  @Output() removeClick = new EventEmitter<ShopCartItem>();

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) {
    this.form = fb.group({
      id: '',
      name: ['', Validators.required],
      amount: ['', Validators.required],
      unitaryValue: ['', Validators.required]
    });
  }

  @Input()
  set item(value: ShopCartItem) {
    this.form.setValue({
      id: value.id,
      name: value.name.trim(),
      amount: value.amount,
      unitaryValue: value.unitaryValue
    })
  }

  get item() {
    const val = this.form.value;
    const item = new ShopCartItem(val.id);
    item.name = val.name.trim();
    item.amount = val.amount;
    item.unitaryValue = val.unitaryValue;
    return item;
  }

  ngOnInit() {

  }

  onSaveClick() {
    if (this.canSave) {
      this.saveClick.emit(this.item);
      this.goBack();
    } else {
      this.snackbar.open('Preencha corretamente os campos', null, { duration: 2000 });
    }
  }
  onRemoveItem() {
    if (confirm('Deseja remover este item?')) {
      this.removeClick.emit(this.item);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['cart'])
  }

  get canSave() {
    return this.form.valid;
  }

}
