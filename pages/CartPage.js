import { Page } from '@playwright/test';

export class CartPage {
    
  /**
   * @param {Page} page
   */
  
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByText('Checkout');
        this.continueShoppingButton = page.getByText('Continue Shopping')
        this.removeButton = page.getByText('Remove');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

}