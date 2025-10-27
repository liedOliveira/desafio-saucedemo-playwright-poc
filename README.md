# 🧪 Desafio Saucedemo - Playwright POC

Este projeto é uma Prova de Conceito (POC) desenvolvida para validar o uso do **Playwright** em testes automatizados da aplicação [SauceDemo](https://www.saucedemo.com/).

Ele foi desenvolvido **utilizando apenas JavaScript e o framework Playwright**, seguindo boas práticas de automação e organização em Page Objects.

## 🚀 1. Pré-requisitos

Antes de rodar o projeto, verifique se o ambiente possui as ferramentas abaixo instaladas:

| Ferramenta | Versão recomendada | Como verificar |
|------------|-------------------|----------------|
| **Node.js** | ≥ 18.x | `node -v` |
| **npm** | ≥ 9.x | `npm -v` |

Se não tiver o Node.js, baixe e instale através do site oficial:
👉 [https://nodejs.org/](https://nodejs.org/)

> 💡 Após instalar o Node.js, feche e abra novamente o terminal para garantir que os comandos `node` e `npm` sejam reconhecidos corretamente.

## 📦 2. Clonar o repositório

```bash
git clone https://github.com/liedOliveira/desafio-saucedemo-playwright-poc.git
```

Depois, entre na pasta do projeto:

```bash
cd desafio-saucedemo-playwright-poc
```

## ⚙️ 3. Instalar as dependências

Instale todas as dependências necessárias:

```bash
npm install
```

Em seguida, instale os navegadores do Playwright:

```bash
npx playwright install
```

## 🧭 4. Estrutura do projeto

```
desafio-saucedemo-playwright-poc/
├── page-objects/           # Páginas estruturadas no padrão Page Object
│   ├── LoginPage.js
│   └── ProductsPage.js
│
├── tests/                  # Casos de teste
│   ├── login.spec.js
│   └── product-navigation.spec.js
│
├── playwright.config.js    # Configuração global do Playwright
├── package.json           # Dependências e scripts do projeto
└── README.md              # Este arquivo
```

## ▶️ 5. Como rodar os testes

### 🧩 Opção 1 — Rodar os testes pelo terminal

Execute todos os testes em modo headless (sem abrir o navegador):

```bash
npx playwright test
```

Para abrir com navegador visível:

```bash
npx playwright test --headed
```

### 🧩 Opção 2 — Rodar pela UI do Playwright (recomendado ✅)

Abra o modo interativo da UI de testes:

```bash
npx playwright test --ui
```

Isso abrirá a interface gráfica do Playwright, onde você pode:

- Rodar testes individualmente
- Ver o passo a passo das execuções
- Visualizar screenshots e vídeos
- Depurar testes diretamente

## 🧩 6. Relatórios e resultados

Após a execução dos testes, o Playwright gera um relatório automático.

Para visualizar o relatório:

```bash
npx playwright show-report
```

Isso abrirá um painel web mostrando:

- Resultados de cada teste
- Tempo de execução
- Screenshots e vídeos (se habilitados)

## 🧰 7. Dicas úteis

Para limpar os resultados de testes antigos:

```bash
npx playwright test --reporter=line
```

Para executar apenas um arquivo:

```bash
npx playwright test tests/product-navigation.spec.js
```

Para executar um teste específico dentro do arquivo:

```bash
npx playwright test -g "Exibir produto em ordem de acordo com o filtro selecionado"
```

## 🧑‍💻 9. Contato

Projeto desenvolvido por Liedson Oliveira  
💼 Analista de QA