<!-- Badges -->
![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-16-green?logo=node.js&logoColor=white)

# Portfolio App

Aplicação de portfólio pessoal construída com Angular, TypeScript e Tailwind CSS.

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Scripts úteis](#scripts-úteis)
- [Rodando localmente](#rodando-localmente)
- [Build e servir produção](#build-e-servir-produção)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Contato](#contato)

## Visão Geral

Este repositório contém o frontend do portfólio. O código-fonte principal está em `src/`. A aplicação foi construída com Angular 17, estilizada com Tailwind CSS e empacotada com os padrões do Angular CLI.

## Tecnologias

- Angular 17
- TypeScript
- Tailwind CSS
- Node.js / npm

## Pré-requisitos

- Node.js (recomendado >=16)
- npm
- (Opcional) Angular CLI global: `npm i -g @angular/cli`

## Scripts úteis

Os scripts em `package.json`:

- `npm start` — inicia o servidor de desenvolvimento (`ng serve`).
- `npm run build` — gera o build de produção em `dist/`.
- `npm run watch` — build em modo observação.
- `npm test` — executa testes unitários com Karma.

Use estes comandos para desenvolver e testar localmente.

## Rodando localmente

1. Instale dependências:

```bash
npm install
```

2. Inicie em modo desenvolvimento:

```bash
npm start
```

Abra `http://localhost:4200/` no navegador.

## Build e servir produção

Gerar build de produção:

```bash
npm run build
```

Os artefatos ficam em `dist/portfolio-app/browser`.

Para servir a pasta de build localmente (ex.: testar o site pronto):

```bash
npx http-server ./dist/portfolio-app/browser -p 8080
```

ou

```bash
npx serve ./dist/portfolio-app/browser
```

## Estrutura do projeto (resumida)

- `src/` — código-fonte
  - `main.ts` — bootstrap da app
  - `index.html` — HTML base
  - `styles.css` — estilos (Tailwind)
  - `app/` — componentes e lógica Angular
    - `app.component.ts` — componente raiz
    - `components/project-card/` — componente de cartão de projeto
- `assets/` — imagens e arquivos estáticos
- `tailwind.config.js` — configuração do Tailwind

## Testes

Executar testes unitários:

```bash
npm test
```

## Contribuição

Contribuições são bem-vindas. Abra uma issue descrevendo a proposta ou envie um pull request com as mudanças.

## Contato

Email: Viniciuspablo801@gmail.com

---

Se quiser, posso também:

- adicionar um script `serve` em `package.json` para servir o build facilmente;
- criar um workflow de GitHub Actions para build/CI/possível deploy;
- traduzir o README para inglês e gerar uma versão curta para o perfil.
