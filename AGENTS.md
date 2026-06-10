# AGENTS.md - Instruções para o Projeto: Copa do Mundo 2026

Este arquivo orienta a LLM sobre as convenções técnicas e o padrão de desenvolvimento deste projeto.

## Contexto do Projeto
- Aplicação: Single Page Application (SPA).
- Stack: HTML5, CSS3, Vanilla JavaScript (sem frameworks).
- Ambiente: Deploy via GitHub Pages (estático).
- Persistência: Exclusivamente via `localStorage`.

## Diretrizes de Código (Padrão Técnico)
- Utilize JavaScript, mas evite bibliotecas externas ou dependências.
- Código deve ser modular: separe a lógica de manipulação de dados, interface (DOM) e persistência (`localStorage`).
- O código deve ser direto e eficiente, visando carregamento rápido no navegador.
- Comentários no código: Curtos e apenas quando a lógica for complexa.
- Manutenção do `localStorage`: Sempre valide a existência e integridade dos dados antes de renderizar.

## Regras de Interface e Lógica
- Atualização de Placar: Ao perder o foco do input de gols (`blur`), dispare a função de salvamento e re-renderização da tabela de classificação.
- Classificação: A lógica de ordenação deve seguir estritamente o padrão FIFA (Pontos > Saldo de Gols > Gols Pró).
- Responsividade: O design deve ser mobile-first (CSS Flexbox/Grid).

## Comandos de Desenvolvimento
- O projeto não possui servidor de backend.
- Verifique se os caminhos dos assets (flags, imagens) estão relativos ao root (`/assets/...`).

## Padrão de Escrita
- Todas as respostas, documentação e comentários devem estar estritamente em Português BR.
- Todas as variáveis, funções e classes devem estar em inglês.
- Todo o código deve seguir o padrão de indentação de 2 espaços.
