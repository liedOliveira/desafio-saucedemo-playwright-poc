import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

import users from '../../test-data/users.json';

/**
 * @Funcionalidade: Finalização de Pedido (Checkout)
 * @Descrição: Como um usuário com itens no carrinho, eu quero preencher minhas informações,
 * revisar meu pedido e finalizá-lo para concluir minha compra.
 */

test.describe('Finalização de Pedido', () => {

    let checkoutPage;
    test.beforeEach(async ({ page }) => {
        // Setup: Login e adição do produto ao carrinho
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);
        await loginPage.goto();
        await loginPage.login(users.valid_user.username, users.valid_user.password);
        await productsPage.selectProductAndAddToCart("Sauce Labs Fleece Jacket");
        await productsPage.goToCart();
        await cartPage.goToCheckout();

    });

    test('Preencher os dados de checkout e finalizar o pedido com sucesso', async ({ page }) => {
      /**
       * @Cenário: Checkout bem-sucedido (Caminho Feliz)
       * @Given que o usuário está na página de informações do checkout
       * @When ele preenche todos os campos obrigatórios (nome, sobrenome, CEP)
       * @And ele clica em 'Continuar'
       * @And ele clica em 'Finalizar' na página de visão geral
       * @And ele deve ver a mensagem 'Thank you for your order!'
       */

        await checkoutPage.fillCheckoutInformation('Liedson', 'Fernandes', '12345');
        await checkoutPage.continueButton.click();
        
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        await checkoutPage.finishOrder();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(checkoutPage.orderCompleteHeader).toHaveText('Thank you for your order!');
    });

    test('Cancelar checkout na fase de informações pessoais', async ({ page }) => {
      /**
       * @Cenário: Cancelar a compra na página de informações
       * @Given que o usuário está na página de informações do checkout
       * @When ele clica no botão 'Cancelar'
       * @Then ele deve retornar para a página do carrinho
       */

        await checkoutPage.fillCheckoutInformation('Liedson', 'Fernandes', '12345');
        await checkoutPage.cancelButton.click();
        
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('Cancelar checkout na fase de visão geral', async ({ page }) => {
      /**
       * @Cenário: Cancelar a compra na página de visão geral do pedido
       * @Given que o usuário está na página de visão geral do checkout
       * @When ele clica no botão 'Cancelar'
       * @Then ele deve retornar para a página de produtos
       */

        await checkoutPage.fillCheckoutInformation('Liedson', 'Fernandes', '12345');
        await checkoutPage.continueButton.click();
        
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        await checkoutPage.cancelButton.click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    });

    test('Tentar prosseguir no checkout sem informar primeiro nome', async ({ page }) => {
      /**
       * @Cenário: Tentativa de checkout sem preencher o primeiro nome
       * @Given que o usuário está na página de informações do checkout
       * @When ele deixa o campo 'Primeiro Nome' em branco
       * @And ele clica em 'Continuar'
       * @Then ele deve ver a mensagem de erro 'Error: First Name is required'
       * @And ele deve permanecer na mesma página
       */

        await checkoutPage.lastNameInput.fill("Fernandes");
        await checkoutPage.postalCodeInput.fill("12345");
        await checkoutPage.continueButton.click();
        
        await expect(page.getByText("Error: First Name is required")).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('Tentar prosseguir no checkout sem informar último nome', async ({ page }) => {
      /**
       * @Cenário: Tentativa de checkout sem preencher o sobrenome
       * @Given que o usuário está na página de informações do checkout
       * @When ele deixa o campo 'Sobrenome' em branco
       * @And ele clica em 'Continuar'
       * @Then ele deve ver a mensagem de erro 'Error: Last Name is required'
       */

        await checkoutPage.firstNameInput.fill("Liedson");
        await checkoutPage.postalCodeInput.fill("12345");
        await checkoutPage.continueButton.click();
        
        await expect(page.getByText("Error: Last Name is required")).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('Tentar prosseguir no checkout sem informar código postal', async ({ page }) => {
      /**
       * @Cenário: Tentativa de checkout sem preencher o código postal
       * @Given que o usuário está na página de informações do checkout
       * @When ele deixa o campo 'Código Postal' em branco
       * @And ele clica em 'Continuar'
       * @Then ele deve ver a mensagem de erro 'Error: Postal Code is required'
       */

        await checkoutPage.firstNameInput.fill("Liedson");
        await checkoutPage.lastNameInput.fill("Fernandes");
        await checkoutPage.continueButton.click();
        
        await expect(page.getByText("Error: Postal Code is required")).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('Tentar prosseguir no checkout sem informar nenhum dado', async ({ page }) => {
      /**
       * @Cenário: Tentativa de checkout com todos os campos em branco
       * @Given que o usuário está na página de informações do checkout
       * @When ele clica em 'Continuar' sem preencher nenhum campo
       * @Then ele deve ver a mensagem de erro 'Error: First Name is required'
       */
        await checkoutPage.continueButton.click();
        
        await expect(page.getByText("Error: First Name is required")).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test.fail('Tentar prosseguir no checkout inserindo apenas espaços em branco', async ({ page }) => {
      /**
       * @Cenário: (Falha Esperada) Tentativa de checkout com espaços em branco
       * @Given que o usuário está na página de informações do checkout
       * @When ele preenche todos os campos apenas com espaços em branco
       * @And ele clica em 'Continuar'
       * @Then ele deveria ver uma mensagem de erro apropriada
       * @Note Este teste está marcado com .fail() pois o comportamento esperado é a falha.
       */
      
        await checkoutPage.fillCheckoutInformation(' ', ' ', ' ');
        await checkoutPage.continueButton.click();
        
        await expect(page.getByText("Error: First Name is required")).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

});