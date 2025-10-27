import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

import users from '../../test-data/users.json';

/**
 * @Funcionalidade: Gerenciamento do Carrinho de Compras
 * @Descrição: Como um usuário logado, desejo adicionar e remover produtos do meu carrinho
 * para prosseguir para a finalização da compra.
 */

test.describe('Adicionar ao Carrinho e Checkout', () => {
    
    let productsPage;
    let cartPage;
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.valid_user.username, users.valid_user.password);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
    });

    test('Adicionar um produto ao carrinho a partir da página de produtos', async ({ page }) => {
    
        /**
         * @Given que o usuário está na página de produtos
         * @When ele adiciona o produto 'Sauce Labs Backpack' ao carrinho
         * @Then o ícone do carrinho deve ser atualizado para '1'
         * @And quando ele navega para a página do carrinho
         * @Then o produto 'Sauce Labs Backpack' deve ser exibido na lista
         * @And quando ele clica para ir ao checkout
         * @Then ele deve ser direcionado para a página de informações do checkout
         */

        await productsPage.selectProductAndAddToCart('Sauce Labs Backpack');

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await productsPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

        await cartPage.goToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('Adicionar um produto ao carrinho a partir da página de detalhes do produto', async ({ page }) => {

        /**
         * @Given que o usuário está na página de produtos
         * @When ele seleciona o produto 'Sauce Labs Bike Light' para ver seus detalhes
         * @And ele adiciona o produto ao carrinho a partir da página de detalhes
         * @Then o ícone do carrinho deve ser atualizado para '1'
         * @And quando ele navega para a página do carrinho
         * @Then o produto 'Sauce Labs Bike Light' deve ser exibido na lista
         */

        await productsPage.selectProduct('Sauce Labs Bike Light');
        await productsPage.AddProductToCart();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await productsPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');

        await cartPage.goToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('Continuar comprando após ir para o carrinho', async ({ page }) => {

    /**
     * @Given que o usuário adicionou um produto ao seu carrinho
     * @And ele está visualizando a página do carrinho
     * @When ele clica no botão 'Continuar Comprando'
     * @Then ele deve ser redirecionado de volta para a página de produtos
     */

        await productsPage.selectProduct('Sauce Labs Bike Light');
        await productsPage.AddProductToCart();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await productsPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');

        await cartPage.continueShoppingButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Remover produto do carrinho', async ({ page }) => {

    /**
     * @Given que o usuário adicionou um produto ao seu carrinho
     * @And ele está visualizando a página do carrinho
     * @When ele clica no botão 'Remover'
     * @Then ele o produto não deve mais aparecer na lista do carrinho
     */

        await productsPage.selectProduct('Sauce Labs Bike Light');
        await productsPage.AddProductToCart();

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await productsPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');

        await cartPage.removeButton.click();
        await expect(page.getByText("Sauce Labs Bike Light")).toBeHidden()
    });

});