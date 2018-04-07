import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { CovalentLayoutModule } from '@covalent/core';
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    CovalentLayoutModule
  ],
  exports: [
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    CovalentLayoutModule
    ]
})
export class SharedModule { }
