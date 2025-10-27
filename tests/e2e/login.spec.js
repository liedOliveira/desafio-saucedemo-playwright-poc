import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import users from '../../test-data/users.json';

/**
 * @Funcionalidade: Autenticação de Usuário
 * @Descrição: Como usuário do sistema, desejo me autenticar para ter acesso
 * às funcionalidades exclusivas da plataforma.
 */

test.describe('Autenticação', () => {

    let loginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Permitir o login com credenciais válidas', async ({ page }) => {

    /**
     * @Given que o usuário esteja na página de login
     * @When ele inserir um nome de usuário válido
     * @And ele inserir uma senha válida
     * @And ele clicar no botão de login
     * @Then ele deve ser redirecionado para a página de produtos
     */

        await loginPage.login(users.valid_user.username, users.valid_user.password);

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('Exibir mensagem de erro para credenciais inválidas', async ({ page }) => {

    /**
     * @Given que o usuário esteja na página de login
     * @When ele inserir um nome de usuário inválido
     * @And ele inserir uma senha inválida
     * @And ele clicar no botão de login
     * @Then ele deve ver uma mensagem de erro informando que as credenciais não correspondem
     */

        await loginPage.login('user_inexistente', 'abasdas');

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();

    });

    test('Exibir mensagem de erro para username válido e senha inválida', async ({ page }) => {

    /**
     * @Given que o usuário esteja na página de login
     * @When ele inserir um nome de usuário válido
     * @And ele inserir uma senha inválida
     * @And ele clicar no botão de login
     * @Then ele deve ver uma mensagem de erro informando que as credenciais não correspondem
     */

        await loginPage.login(users.valid_user.username, 'senhaerrada');

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();

    });
    
    test('Exibir mensagem de erro para username inválido e senha válida', async ({ page }) => {

    /**
     * @Given que o usuário esteja na página de login
     * @When ele inserir um nome de usuário inválido
     * @And ele inserir uma senha válida
     * @And ele clicar no botão de login
     * @Then ele deve ver uma mensagem de erro informando que as credenciais não correspondem
     */

        await loginPage.login('usernameinválido', users.valid_user.password);

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();

    });

    test('Não permitir usuário bloquado realizar login', async ({ page }) => {

    /**
     * @Given que o usuário esteja na página de login
     * @When ele inserir as credenciais de um usuário bloqueado
     * @And ele clicar no botão de login
     * @Then ele deve ver uma mensagem de erro informando que o usuário está bloqueado
     */

        await loginPage.login(users.locked_out_user.username, users.locked_out_user.password);

        await expect(page.getByText("Epic sadface: Sorry, this user has been locked out.")).toBeVisible();

    });

});
