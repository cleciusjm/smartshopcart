import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ShopCartListComponent } from './shop-cart-list/shop-cart-list.component';
import { ShopCartComponent } from './shop-cart.component';
import * as Routes from "./shop-cart.routes"
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Routes.module
  ],
  declarations: [
    ShopCartComponent,
    ShopCartListComponent
  ],
  exports: [RouterModule]
})
export class ShopCartModule { }
