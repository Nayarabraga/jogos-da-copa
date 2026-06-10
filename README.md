# ⚽ Copa do Mundo 2026 - Acompanhamento de Jogos

Aplicação web desenvolvida com **HTML, CSS e JavaScript** para acompanhar toda a **Copa do Mundo FIFA Masculina 2026**.

O sistema permite visualizar seleções, grupos, classificação, calendário de partidas e registrar resultados dos jogos, com armazenamento local utilizando **Local Storage**, sem necessidade de servidor ou banco de dados.

## 🌎 Deploy

O projeto é hospedado através do **GitHub Pages**.

---

## 🎯 Objetivo

Fornecer uma forma simples, rápida e intuitiva de acompanhar toda a competição, desde a fase de grupos até a grande final.

Ao acessar o sistema, o usuário já visualiza:

* Jogos da data atual;
* Times participantes das partidas;
* Campo para inserção dos gols;
* Classificação atualizada automaticamente;
* Calendário completo da competição.

---

## ✨ Funcionalidades

### 🏆 Seleções

* Lista completa das seleções participantes;
* Nome e bandeira de cada país;
* Visualização organizada por grupos.

### 📊 Fase de Grupos

* Exibição dos grupos oficiais;
* Tabela de classificação;
* Pontuação automática;
* Saldo de gols;
* Gols pró;
* Gols contra;
* Atualização em tempo real após informar resultados.

### 📅 Calendário

Visualização dos jogos em diferentes formatos:

* Calendário diário;
* Calendário semanal;
* Calendário mensal;
* Lista completa de partidas.

### ⚽ Registro de Resultados

Para cada partida o usuário poderá informar:

* Gols do time mandante;
* Gols do time visitante.

Após salvar:

* Classificação é recalculada automaticamente;
* Estatísticas são atualizadas;
* Dados permanecem salvos localmente.

### 🏅 Mata-Mata

Acompanhamento completo das fases eliminatórias:

* Oitavas de Final;
* Quartas de Final;
* Semifinais;
* Disputa de 3º Lugar;
* Final.

### 💾 Persistência Local

Todos os dados inseridos pelo usuário são armazenados utilizando:

```javascript
localStorage
```

Isso permite que as informações permaneçam disponíveis mesmo após fechar ou atualizar a página.

### 🖨️ Exportação e Impressão

O sistema permite:

* Imprimir classificação;
* Imprimir tabela de jogos;

---

## 🚀 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Local Storage
* GitHub Pages

---

## 📁 Estrutura do Projeto

```text
/
├── index.html
├── css/
├── js/
├── assets/
│   ├── flags/
│   └── images/
└── README.md
```

---

## 🧠 Regras de Negócio

### Classificação

A pontuação segue o padrão FIFA:

| Resultado | Pontos |
| --------- | ------ |
| Vitória   | 3      |
| Empate    | 1      |
| Derrota   | 0      |

Critérios de desempate:

1. Pontos;
2. Saldo de gols;
3. Gols marcados.

---

## 📌 Página Inicial

A tela principal prioriza os jogos da data atual.

Exemplo:

```text
Jogos de Hoje

Brasil      [ 2 ] x [ 1 ]      Espanha
Argentina   [ 0 ] x [ 0 ]      França
Japão       [ 1 ] x [ 3 ]      Alemanha
```

Ao alterar qualquer placar:

* Os dados são salvos automaticamente (ao sair do input);
* A classificação é recalculada;
* As estatísticas são atualizadas.

---

## 🔄 Armazenamento

Exemplo simplificado dos dados:

```javascript
{
  "match_001": {
    "homeGoals": 2,
    "awayGoals": 1
  }
}
```

Todos os registros são persistidos no navegador através do Local Storage.
