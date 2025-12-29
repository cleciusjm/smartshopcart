import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cart', pathMatch: 'full' }
];

export const module: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
  initialNavigation: 'enabledBlocking',
  enableTracing: false,
  onSameUrlNavigation: 'reload'
});
