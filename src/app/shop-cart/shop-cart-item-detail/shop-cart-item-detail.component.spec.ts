import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartItemDetailComponent } from './shop-cart-item-detail.component';

describe('ShopCartItemDetailComponent', () => {
  let component: ShopCartItemDetailComponent;
  let fixture: ComponentFixture<ShopCartItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
