// tests/e2e/03-product-validation.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

import users from '../../test-data/users.json';

test.describe('Validação de Detalhes do Produto', () => {
    
    let productsPage;
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.valid_user.username, users.valid_user.password);

        productsPage = new ProductsPage(page);
    });

    test('Exibir título, preço e descrição corretos na página de detalhes', async ({ page }) => {

        /**
         * @Given que o usuário está na página de produtos
         * @When ele clica no produto 'Sauce Labs Backpack'
         * @Then ele é redirecionado para a página de detalhes do produto
         * @And o título do produto deve ser 'Sauce Labs Backpack'
         * @And a descrição do produto deve conter o texto esperado
         * @And o preço do produto deve ser '$29.99'
         */
        
        await productsPage.selectProduct('Sauce Labs Backpack');

        const productDetailName = page.locator('.inventory_details_name');
        const productDetailDesc = page.locator('.inventory_details_desc');
        const productDetailPrice = page.locator('.inventory_details_price');

        await expect(productDetailName).toHaveText('Sauce Labs Backpack');
        await expect(productDetailDesc).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack');
        await expect(productDetailPrice).toHaveText('$29.99');
    });
});