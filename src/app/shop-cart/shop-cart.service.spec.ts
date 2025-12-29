import { TestBed, inject } from '@angular/core/testing';

import { ShopCartService } from './shop-cart.service';

describe('ShopCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopCartService]
    });
  });

  it('should be created', () => {
    const service: ShopCartService = TestBed.inject(ShopCartService);
    expect(service).toBeTruthy();
  });
});
