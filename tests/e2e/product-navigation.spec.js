import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

import users from '../../test-data/users.json';

/**
 * @Funcionalidade: Visualização e Filtragem de Produtos
 * @Descrição: Como um usuário autenticado, eu quero visualizar a lista de produtos
 * e ordená-los de acordo com os filtros disponíveis para facilitar minha busca.
 */

test.describe('Navegação e Pesquisa de Produtos', () => {

    let productPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        productPage = new ProductsPage(page);
        await loginPage.goto();
        await loginPage.login(users.valid_user.username, users.valid_user.password);
        

    });

    test('Exibir a lista de produtos após o login', async ({ page }) => {
        
    /**
     * @Given que o usuário está logado na aplicação
     * @When ele é direcionado para a página de inventário
     * @Then ele deve ver uma lista com um ou mais produtos disponíveis
     */
        
        await expect(page.locator('.title')).toHaveText('Products');
        await expect(page.locator('.inventory_list')).toBeVisible();
        const productItems = page.locator('.inventory_item');
        expect(await productItems.count()).toBeGreaterThan(0);
    });

    test('Exibir produto em ordem de acordo com o filtro selecionado', async ({ page }) => {

   /**
     * @Given que o usuário está na página de produtos
     * @When ele seleciona o filtro 'Price (low to high)'
     * @Then a lista de produtos deve ser reordenada
     * @And o primeiro produto da lista deve ser o 'Sauce Labs Onesie'
     */

        await expect(page.locator('.title')).toHaveText('Products');
        await expect(page.locator('.inventory_list')).toBeVisible();

        await productPage.selectFilter('Price (low to high)');
        const firstProduct = page.locator("//div[@data-test='inventory-item-name']").first();
        await expect(firstProduct).toHaveText('Sauce Labs Onesie');
    });


});