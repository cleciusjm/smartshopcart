import { TestBed, inject } from '@angular/core/testing';
import { ShopCartService } from './shop-cart.service';
import { ShopCart, ShopCartItem } from './shop-cart';

describe('ShopCartService', () => {
  let service: ShopCartService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return mockLocalStorage[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });

    TestBed.configureTestingModule({
      providers: [ShopCartService]
    });

    service = TestBed.get(ShopCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentCart', () => {
    it('should get and set the current cart', () => {
      const cart = new ShopCart();
      const item = new ShopCartItem();
      item.name = 'Test Item';
      item.unitaryValue = 10;
      item.amount = 2;
      cart.items.push(item);

      service.currentCart = cart;
      const result = service.currentCart;

      expect(result).toEqual(cart);
      expect(result.items.length).toBe(1);
      expect(result.items[0].name).toBe('Test Item');
    });

    it('should return null if no cart is in local storage', () => {
      expect(service.currentCart).toBeNull();
    });

    it('should handle invalid JSON in local storage', () => {
      mockLocalStorage['smartGroceryCart.currentCart'] = 'invalid json';
      spyOn(console, 'error');
      expect(service.currentCart).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle malformed JSON (missing items array)', () => {
        mockLocalStorage['smartGroceryCart.currentCart'] = '{}';
        const cart = service.currentCart;
        expect(cart).not.toBeNull();
        expect(cart.items).toEqual([]);
    });

    it('should handle cart with empty items array from local storage', () => {
        mockLocalStorage['smartGroceryCart.currentCart'] = '{"items":[]}';
        const cart = service.currentCart;
        expect(cart).not.toBeNull();
        expect(cart.items).toEqual([]);
    });

  });

  describe('persistence', () => {
    it('should persist the cart to local storage', () => {
      const cart = new ShopCart();
      const item = new ShopCartItem();
      item.name = 'Test Item';
      cart.items.push(item);

      service.currentCart = cart;

      const persistedJson = mockLocalStorage['smartGroceryCart.currentCart'];
      const persistedCart = JSON.parse(persistedJson);

      expect(persistedCart.items[0].name).toBe('Test Item');
    });

    it('should handle null cart when persisting', () => {
      service.currentCart = null;
      expect(mockLocalStorage['smartGroceryCart.currentCart']).toBeUndefined();
    });

    it('should create a new ShopCart object from persisted data', () => {
        const cart = new ShopCart();
        const item = new ShopCartItem();
        item.name = 'Test Item';
        cart.items.push(item);
        service.currentCart = cart;

        const result = service.currentCart;
        expect(result instanceof ShopCart).toBe(true);
        expect(result.items[0] instanceof ShopCartItem).toBe(true);
      });

      it('should persist a cart with multiple items', () => {
        const cart = new ShopCart();
        const item1 = new ShopCartItem();
        item1.name = 'Item 1';
        const item2 = new ShopCartItem();
        item2.name = 'Item 2';
        cart.items.push(item1, item2);

        service.currentCart = cart;

        const persistedJson = mockLocalStorage['smartGroceryCart.currentCart'];
        const persistedCart = JSON.parse(persistedJson);

        expect(persistedCart.items.length).toBe(2);
        expect(persistedCart.items[0].name).toBe('Item 1');
        expect(persistedCart.items[1].name).toBe('Item 2');
      });
  });
});
