import { browser, by, element } from 'protractor';

describe('ShopCart Component', () => {

  beforeEach(() => {
    browser.get('/shop-cart');
  });

  it('should display the component', () => {
    expect(element(by.css('app-shop-cart h2')).getText()).toEqual('Shop Cart');
  });

  it('should add a new item to the cart', () => {
    const initialCount = element.all(by.css('app-shop-cart-list-item')).count();
    element(by.css('app-shop-cart-item-detail input')).sendKeys('New Item');
    element(by.css('app-shop-cart-item-detail button')).click();
    const finalCount = element.all(by.css('app-shop-cart-list-item')).count();
    expect(finalCount).toBeGreaterThan(initialCount);
  });

  it('should clear the cart', () => {
    element(by.css('app-shop-cart-item-detail input')).sendKeys('New Item');
    element(by.css('app-shop-cart-item-detail button')).click();
    element(by.buttonText('Clear')).click();
    const finalCount = element.all(by.css('app-shop-cart-list-item')).count();
    expect(finalCount).toEqual(0);
  });
});
