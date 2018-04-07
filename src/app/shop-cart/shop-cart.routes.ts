import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopCartComponent } from './shop-cart.component';

const routes: Routes = [
  {
    path: 'cart',
    component: ShopCartComponent,
  },
  {
    path: 'cart/newItem',
    component: ShopCartComponent,
  }
];

export const module: ModuleWithProviders = RouterModule.forChild(routes);
