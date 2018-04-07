import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ShopCartListComponent } from './shop-cart-list/shop-cart-list.component';
import { ShopCartComponent } from './shop-cart.component';
import * as Routes from "./shop-cart.routes"
import { RouterModule } from '@angular/router';
import { ShopCartItemDetailComponent } from './shop-cart-item-detail/shop-cart-item-detail.component';
import { ShopCartService } from './shop-cart.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Routes.module
  ],
  providers: [ShopCartService],
  declarations: [
    ShopCartComponent,
    ShopCartListComponent,
    ShopCartItemDetailComponent
  ],
  exports: [RouterModule]
})
export class ShopCartModule { }
