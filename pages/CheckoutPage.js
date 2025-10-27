import { Page } from '@playwright/test'

export class CheckoutPage {
  
  /**
   * @param {Page} page
   */
    
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.cancelButton = page.getByText('Cancel');
        this.continueButton = page.locator("//input[@data-test='continue']");
        this.finishButton = page.getByText('Finish');
        this.orderCompleteHeader = page.locator("//h2[@data-test='complete-header']");
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);

    }

    async finishOrder() {
        await this.finishButton.click();
    }
}