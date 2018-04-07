import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CovalentLayoutModule } from '@covalent/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import * as Routes from "./app.routes";
import { ShopCartModule } from './shop-cart/shop-cart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SharedModule,
    Routes.module,
    ShopCartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
