import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartListComponent } from './shop-cart-list.component';

describe('ShopCartListComponent', () => {
  let component: ShopCartListComponent;
  let fixture: ComponentFixture<ShopCartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
