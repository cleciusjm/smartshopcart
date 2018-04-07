import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cart', pathMatch: 'full' }
];

export const module: ModuleWithProviders = RouterModule.forRoot(routes, {
  initialNavigation: 'enabled',
  enableTracing: false,
  onSameUrlNavigation: 'reload'
});
