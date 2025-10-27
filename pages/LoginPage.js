import { Page } from '@playwright/test'

import { FRONT_URLS } from '../src/front-urls.js';

export class LoginPage {

  /**
   * @param {Page} page
   */

    constructor(page) {

        this.page = page;
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.locator("//input[@data-test='login-button']");
    }

    async goto() {
        await this.page.goto(FRONT_URLS.LOGIN);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}