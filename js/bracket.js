// js/bracket.js
// Módulo responsável pela renderização do chaveamento das eliminatórias

import { StorageService } from './storage.js';

const BRACKET_KEY = 'world_cup_2026_knockout';

// Estrutura inicial do chaveamento — todas as partidas com times "A definir"
const INITIAL_KNOCKOUT = {
  roundOf32: {
    label: 'Segunda Rodada',
    matches: Array.from({ length: 16 }, (_, i) => ({
      id: `r32_${i + 1}`,
      home: null,
      away: null,
      golsHome: null,
      golsAway: null
    }))
  },
  roundOf16: {
    label: 'Oitavas de Final',
    matches: Array.from({ length: 8 }, (_, i) => ({
      id: `r16_${i + 1}`,
      home: null,
      away: null,
      golsHome: null,
      golsAway: null
    }))
  },
  quarterFinals: {
    label: 'Quartas de Final',
    matches: Array.from({ length: 4 }, (_, i) => ({
      id: `qf_${i + 1}`,
      home: null,
      away: null,
      golsHome: null,
      golsAway: null
    }))
  },
  semiFinals: {
    label: 'Semifinais',
    matches: Array.from({ length: 2 }, (_, i) => ({
      id: `sf_${i + 1}`,
      home: null,
      away: null,
      golsHome: null,
      golsAway: null
    }))
  },
  final: {
    label: 'Final',
    matches: [{
      id: 'final_1',
      home: null,
      away: null,
      golsHome: null,
      golsAway: null
    }]
  }
};

/**
 * Carrega dados do chaveamento do localStorage.
 * @returns {Object} Estado atual do chaveamento
 */
function loadKnockout() {
  const raw = localStorage.getItem(BRACKET_KEY);
  if (!raw) {
    localStorage.setItem(BRACKET_KEY, JSON.stringify(INITIAL_KNOCKOUT));
    return INITIAL_KNOCKOUT;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(BRACKET_KEY, JSON.stringify(INITIAL_KNOCKOUT));
    return INITIAL_KNOCKOUT;
  }
}

/**
 * Salva os dados do chaveamento no localStorage.
 * @param {Object} knockout - Dados do chaveamento
 */
function saveKnockout(knockout) {
  try {
    localStorage.setItem(BRACKET_KEY, JSON.stringify(knockout));
  } catch (e) {
    console.error('Erro ao salvar o chaveamento no localStorage.', e);
  }
}

/**
 * Cria o elemento HTML de uma partida do chaveamento.
 * Se home ou away for null, exibe estado visual "A definir".
 * @param {Object} match - Dados da partida
 * @param {string} roundKey - Chave da rodada (ex: 'roundOf16')
 * @returns {HTMLElement}
 */
function createBracketMatch(match, roundKey) {
  const card = document.createElement('div');
  const isDefined = match.home !== null && match.away !== null;
  card.className = `bracket-match${isDefined ? '' : ' bracket-match--pending'}`;
  card.dataset.matchId = match.id;
  card.dataset.round = roundKey;

  if (!isDefined) {
    // Estado "A definir": exibe placeholder sem inputs
    card.innerHTML = `
      <div class="bracket-team bracket-team--home bracket-team--pending">
        <span class="bracket-team-name">A definir</span>
      </div>
      <div class="bracket-separator">×</div>
      <div class="bracket-team bracket-team--away bracket-team--pending">
        <span class="bracket-team-name">A definir</span>
      </div>
    `;
    return card;
  }

  const homeFlagSrc = `/assets/flags/${match.home.code.toLowerCase()}.png`;
  const awayFlagSrc = `/assets/flags/${match.away.code.toLowerCase()}.png`;
  const valHome = match.golsHome !== null ? match.golsHome : '';
  const valAway = match.golsAway !== null ? match.golsAway : '';

  card.innerHTML = `
    <div class="bracket-team bracket-team--home">
      <img src="${homeFlagSrc}" alt="Bandeira ${match.home.name}" class="bracket-flag" onerror="this.style.display='none'">
      <span class="bracket-team-code">${match.home.code}</span>
      <span class="bracket-team-name">${match.home.name}</span>
      <input
        type="number"
        min="0"
        class="bracket-score-input bracket-home-input"
        value="${valHome}"
        aria-label="Placar do time mandante ${match.home.name}"
        placeholder="-"
      >
    </div>
    <div class="bracket-separator">×</div>
    <div class="bracket-team bracket-team--away">
      <input
        type="number"
        min="0"
        class="bracket-score-input bracket-away-input"
        value="${valAway}"
        aria-label="Placar do time visitante ${match.away.name}"
        placeholder="-"
      >
      <span class="bracket-team-name">${match.away.name}</span>
      <span class="bracket-team-code">${match.away.code}</span>
      <img src="${awayFlagSrc}" alt="Bandeira ${match.away.name}" class="bracket-flag" onerror="this.style.display='none'">
    </div>
  `;

  return card;
}

/**
 * Renderiza o chaveamento completo no elemento #bracket-container.
 */
function renderBracket() {
  const container = document.getElementById('bracket-container');
  if (!container) return;

  container.innerHTML = '';
  const knockout = loadKnockout();

  const roundOrder = ['roundOf32', 'roundOf16', 'quarterFinals', 'semiFinals', 'final'];

  roundOrder.forEach(roundKey => {
    const round = knockout[roundKey];
    if (!round) return;

    // Container da rodada
    const roundEl = document.createElement('div');
    roundEl.className = 'bracket-round';
    roundEl.dataset.round = roundKey;

    // Título da rodada
    const roundTitle = document.createElement('h3');
    roundTitle.className = 'bracket-round-title';
    roundTitle.textContent = round.label;
    roundEl.appendChild(roundTitle);

    // Lista de partidas da rodada
    const matchesEl = document.createElement('div');
    matchesEl.className = 'bracket-matches';

    round.matches.forEach(match => {
      const matchEl = createBracketMatch(match, roundKey);
      matchesEl.appendChild(matchEl);
    });

    roundEl.appendChild(matchesEl);
    container.appendChild(roundEl);
  });

  initBracketListeners(container, knockout);
}

/**
 * Inicializa os listeners de eventos nos inputs do chaveamento.
 * Persiste o placar no localStorage ao perder o foco.
 * @param {HTMLElement} container - O container do bracket
 * @param {Object} knockout - Estado atual do chaveamento
 */
function initBracketListeners(container, knockout) {
  container.addEventListener('focusout', (event) => {
    const target = event.target;
    if (!target.classList.contains('bracket-score-input')) return;

    const matchCard = target.closest('.bracket-match');
    if (!matchCard) return;

    const { matchId, round: roundKey } = matchCard.dataset;
    const round = knockout[roundKey];
    if (!round) return;

    const matchData = round.matches.find(m => m.id === matchId);
    if (!matchData) return;

    const homeInput = matchCard.querySelector('.bracket-home-input');
    const awayInput = matchCard.querySelector('.bracket-away-input');

    const parseGoal = (val) => {
      if (val === '' || val === null) return null;
      const n = parseInt(val, 10);
      return isNaN(n) || n < 0 ? null : n;
    };

    matchData.golsHome = parseGoal(homeInput ? homeInput.value : null);
    matchData.golsAway = parseGoal(awayInput ? awayInput.value : null);

    saveKnockout(knockout);
  });
}

// Inicializa o chaveamento ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderBracket();
});
