import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopCartComponent } from './shop-cart.component';
import { ShopCartService } from './shop-cart.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShopCartComponent', () => {
  let component: ShopCartComponent;
  let fixture: ComponentFixture<ShopCartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ShopCartComponent],
      providers: [ShopCartService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

