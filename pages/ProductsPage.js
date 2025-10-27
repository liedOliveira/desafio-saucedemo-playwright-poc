import { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class ProductsPage {

  /**
   * @param {Page} page
   */

    constructor(page) {
        this.page = page;
        this.cartLink = page.locator("//a[@data-test='shopping-cart-link']");
        this.filterDropdown = page.locator("//span[@class='select_container']");

    }

    async selectProduct(productName) {
        await this.page.getByText(productName).click();
    }

    async AddProductToCart() {
        await this.page.getByRole("button", {name: "Add to cart"}).click();
        await expect(this.page.getByRole("button", {name: "Remove"})).toBeVisible();
    }

    async selectProductAndAddToCart(productName) {
        await this.page.locator(`//div[text()='${productName}']/../../..//button[text()='Add to cart']`).click();
    }
    
    async goToCart() {
        await this.cartLink.click();
    }

    async selectFilter(optionText) {
        await this.filterDropdown.click();
        await this.page.selectOption("//select[@data-test='product-sort-container']", { label: optionText });
    }

}