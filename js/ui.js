// js/ui.js

import { StorageService } from './storage.js';
import { calculateStandings } from './calculator.js';
import { showSaveFeedback } from './main.js';


/**
 * Renderiza as tabelas de classificação para cada grupo (A a H).
 */
export function renderGroups() {
  const container = document.getElementById('groups-container');
  if (!container) return;

  container.innerHTML = '';

  const data = StorageService.load();
  const standings = calculateStandings(data.matches, data.teams);
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  groups.forEach(groupId => {
    const groupTeams = standings.filter(t => t.group === groupId);

    // Cria o card do grupo
    const groupCard = document.createElement('div');
    groupCard.className = 'group-card';

    const groupTitle = document.createElement('h3');
    groupTitle.textContent = `Grupo ${groupId}`;
    groupCard.appendChild(groupTitle);

    const table = document.createElement('table');
    table.className = 'group-table';

    // Cabeçalho da tabela
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th class="col-pos">Pos</th>
        <th class="col-team">Seleção</th>
        <th class="col-pts">P</th>
        <th class="col-sg">SG</th>
        <th class="col-gp">GP</th>
      </tr>
    `;
    table.appendChild(thead);

    // Corpo da tabela
    const tbody = document.createElement('tbody');
    groupTeams.forEach((team, index) => {
      const tr = document.createElement('tr');
      
      // Destaca os 2 primeiros colocados (zona de classificação)
      if (index < 2) {
        tr.className = 'qualified';
      }

      const flagPath = `/assets/flags/${team.abbreviation.toLowerCase()}.png`;

      tr.innerHTML = `
        <td class="col-pos font-bold">${index + 1}º</td>
        <td class="col-team">
          <div class="team-info">
            <img src="${flagPath}" alt="Bandeira do ${team.name}" class="flag-icon" onerror="this.style.display='none'">
            <span class="team-name-full">${team.name}</span>
            <span class="team-name-short">${team.abbreviation}</span>
          </div>
        </td>
        <td class="col-pts font-bold">${team.points}</td>
        <td class="col-sg">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
        <td class="col-gp">${team.goalsFor}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    groupCard.appendChild(table);
    container.appendChild(groupCard);
  });
}

/**
 * Formata a data de uma partida para 'DD/MM • Dia da semana • HH:mm'.
 * @param {string} dateStr - ISO 8601 (ex: '2026-06-12T13:00:00Z')
 * @returns {Object} { datePart, weekday, timePart }
 */
function formatMatchDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const weekday = weekdays[date.getUTCDay()];

  return {
    datePart: `${day}/${month}`,
    weekday,
    timePart: `${hours}:${minutes}`
  };
}

/**
 * Renderiza o calendário de partidas, agrupando por dia.
 */
export function renderMatches() {
  const container = document.getElementById('matches-container');
  if (!container) return;

  container.innerHTML = '';

  const data = StorageService.load();
  const teamsMap = {};
  data.teams.forEach(team => {
    teamsMap[team.id] = team;
  });

  const matches = Object.values(data.matches || {});
  
  // Ordena as partidas por data
  matches.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Agrupa as partidas por data (somente o dia YYYY-MM-DD)
  const matchesByDate = {};
  matches.forEach(match => {
    const dateKey = match.date.substring(0, 10);
    if (!matchesByDate[dateKey]) {
      matchesByDate[dateKey] = [];
    }
    matchesByDate[dateKey].push(match);
  });

  // Renderiza cada grupo de partidas por data
  Object.keys(matchesByDate).forEach(dateStr => {
    const dateObj = new Date(dateStr + 'T00:00:00');
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('pt-BR', options);

    const dateGroup = document.createElement('div');
    dateGroup.className = 'date-group';

    const dateTitle = document.createElement('h3');
    dateTitle.className = 'date-title';
    dateTitle.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    dateGroup.appendChild(dateTitle);

    const matchesList = document.createElement('div');
    matchesList.className = 'matches-list';

    matchesByDate[dateStr].forEach(match => {
      const teamA = teamsMap[match.teamA];
      const teamB = teamsMap[match.teamB];

      if (!teamA || !teamB) return;

      const flagA = `/assets/flags/${teamA.abbreviation.toLowerCase()}.png`;
      const flagB = `/assets/flags/${teamB.abbreviation.toLowerCase()}.png`;
      const { datePart, weekday, timePart } = formatMatchDate(match.date);

      const matchCard = document.createElement('div');
      matchCard.className = 'match-card';
      matchCard.dataset.matchId = match.id;

      const valA = match.golsA !== null ? match.golsA : '';
      const valB = match.golsB !== null ? match.golsB : '';

      matchCard.innerHTML = `
        <div class="match-info-header">
          <span class="match-phase">Grupo ${teamA.group}</span>
          <span class="match-datetime">${datePart} • ${weekday} • ${timePart}</span>
        </div>
        <div class="match-teams-score">
          <div class="team home">
            <img src="${flagA}" alt="Bandeira ${teamA.name}" class="flag-icon" onerror="this.style.display='none'">
            <div class="team-names">
              <span class="team-abbr">${teamA.abbreviation}</span>
              <span class="team-name team-name-full">${teamA.name}</span>
            </div>
          </div>
          <div class="score-container">
            <input
              type="number"
              min="0"
              placeholder="-"
              class="score-input home-input"
              value="${valA}"
              aria-label="Placar do time mandante ${teamA.name}"
            >
            <span class="score-separator">x</span>
            <input
              type="number"
              min="0"
              placeholder="-"
              class="score-input away-input"
              value="${valB}"
              aria-label="Placar do time visitante ${teamB.name}"
            >
          </div>
          <div class="team away">
            <div class="team-names">
              <span class="team-abbr">${teamB.abbreviation}</span>
              <span class="team-name team-name-full">${teamB.name}</span>
            </div>
            <img src="${flagB}" alt="Bandeira ${teamB.name}" class="flag-icon" onerror="this.style.display='none'">
          </div>
        </div>
      `;
      matchesList.appendChild(matchCard);
    });

    dateGroup.appendChild(matchesList);
    container.appendChild(dateGroup);
  });
}

/**
 * Inicializa o listener de eventos delegado nos inputs de placar.
 * Escuta os eventos change e focusout (que propaga a partir do blur) para interatividade em tempo real.
 */
function initScoreListener() {
  const container = document.getElementById('matches-container');
  if (!container) return;

  // Flag de debounce para evitar dupla execução quando focusout e change disparam juntos
  let _debounceTimer = null;

  const handleScoreUpdate = (event) => {
    const target = event.target;
    if (!target.classList.contains('score-input')) return;

    // Cancela chamada pendente e agenda nova — garante execução única por interação
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(() => {
      const matchCard = target.closest('.match-card');
      if (!matchCard) return;

      const matchId = matchCard.dataset.matchId;
      const homeInput = matchCard.querySelector('.home-input');
      const awayInput = matchCard.querySelector('.away-input');

      let valHome = homeInput.value.trim();
      let valAway = awayInput.value.trim();

      // Validação: garante que valores negativos não sejam aceitos
      if (valHome !== '') {
        const valHomeNum = parseInt(valHome, 10);
        if (isNaN(valHomeNum) || valHomeNum < 0) {
          valHome = '0';
          homeInput.value = '0';
        }
      }
      if (valAway !== '') {
        const valAwayNum = parseInt(valAway, 10);
        if (isNaN(valAwayNum) || valAwayNum < 0) {
          valAway = '0';
          awayInput.value = '0';
        }
      }

      // Persiste no localStorage
      StorageService.updateMatch(matchId, valHome, valAway);

      // Feedback visual: borda verde momentânea no input editado
      showSaveFeedback(target);

      // Re-renderiza apenas as tabelas de classificação (re-renderização parcial)
      renderGroups();

      // Atualiza o destaque visual do card da partida
      updateCardHighlight(matchCard, valHome, valAway);
    }, 0);
  };

  // Escuta focusout (borbulha do blur) e change (setinhas do input type=number)
  container.addEventListener('focusout', handleScoreUpdate);
  container.addEventListener('change', handleScoreUpdate);

  // Retira o foco do input ao pressionar Enter para forçar o salvamento imediato
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('score-input')) {
      event.target.blur();
    }
  });
}

/**
 * Destaca visualmente o time mandante ou visitante dependendo do placar
 */
function updateCardHighlight(matchCard, valHome, valAway) {
  const homeTeamEl = matchCard.querySelector('.team.home');
  const awayTeamEl = matchCard.querySelector('.team.away');

  if (!homeTeamEl || !awayTeamEl) return;

  // Limpa classes anteriores
  homeTeamEl.classList.remove('winner', 'loser', 'draw');
  awayTeamEl.classList.remove('winner', 'loser', 'draw');

  if (valHome !== '' && valAway !== '') {
    const golsHome = parseInt(valHome, 10);
    const golsAway = parseInt(valAway, 10);

    if (!isNaN(golsHome) && !isNaN(golsAway)) {
      if (golsHome > golsAway) {
        homeTeamEl.classList.add('winner');
        awayTeamEl.classList.add('loser');
      } else if (golsAway > golsHome) {
        awayTeamEl.classList.add('winner');
        homeTeamEl.classList.add('loser');
      } else {
        homeTeamEl.classList.add('draw');
        awayTeamEl.classList.add('draw');
      }
    }
  }
}

/**
 * Destaca os times de todos os cards de partida após renderizar
 */
function highlightAllMatches() {
  const cards = document.querySelectorAll('.match-card');
  cards.forEach(card => {
    const homeInput = card.querySelector('.home-input');
    const awayInput = card.querySelector('.away-input');
    if (homeInput && awayInput) {
      updateCardHighlight(card, homeInput.value, awayInput.value);
    }
  });
}

/**
 * Inicialização completa da interface
 */
export function initUI() {
  renderGroups();
  renderMatches();
  initScoreListener();
  highlightAllMatches();
}
