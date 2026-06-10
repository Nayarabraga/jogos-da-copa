// js/ui.js

import { StorageService } from './storage.js';

/**
 * Calcula a classificação de cada time com base nas partidas jogadas.
 * Retorna uma lista de times com estatísticas atualizadas.
 */
export function calculateStandings() {
  const data = StorageService.load();
  const teams = data.teams || [];
  const matches = data.matches ? Object.values(data.matches) : [];

  // Inicializa o mapa de estatísticas para cada time
  const standingsMap = {};
  teams.forEach(team => {
    standingsMap[team.id] = {
      id: team.id,
      name: team.name,
      abbreviation: team.abbreviation,
      group: team.group,
      points: 0,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0
    };
  });

  // Percorre as partidas para somar os pontos e gols
  matches.forEach(match => {
    const { teamA, teamB, golsA, golsB } = match;
    
    // Partida só conta se ambos os gols estiverem definidos
    if (golsA !== null && golsB !== null) {
      const tA = standingsMap[teamA];
      const tB = standingsMap[teamB];

      if (tA && tB) {
        tA.played += 1;
        tB.played += 1;
        tA.goalsFor += golsA;
        tA.goalsAgainst += golsB;
        tB.goalsFor += golsB;
        tB.goalsAgainst += golsA;

        if (golsA > golsB) {
          tA.points += 3;
          tA.wins += 1;
          tB.losses += 1;
        } else if (golsA < golsB) {
          tB.points += 3;
          tB.wins += 1;
          tA.losses += 1;
        } else {
          tA.points += 1;
          tB.points += 1;
          tA.draws += 1;
          tB.draws += 1;
        }
      }
    }
  });

  // Calcula o saldo de gols para todos os times
  const standings = Object.values(standingsMap);
  standings.forEach(t => {
    t.goalDifference = t.goalsFor - t.goalsAgainst;
  });

  return standings;
}

/**
 * Ordena os times seguindo as regras da FIFA:
 * Pontos > Saldo de Gols > Gols Pró.
 */
function sortTeams(teams) {
  return teams.slice().sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    if (b.goalsFor !== a.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Renderiza as tabelas de classificação para cada grupo (A a H).
 */
export function renderGroups() {
  const container = document.getElementById('groups-container');
  if (!container) return;

  container.innerHTML = '';

  const standings = calculateStandings();
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  groups.forEach(groupId => {
    const groupTeams = standings.filter(t => t.group === groupId);
    const sortedTeams = sortTeams(groupTeams);

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
    sortedTeams.forEach((team, index) => {
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

      const matchCard = document.createElement('div');
      matchCard.className = 'match-card';
      matchCard.dataset.matchId = match.id;

      const valA = match.golsA !== null ? match.golsA : '';
      const valB = match.golsB !== null ? match.golsB : '';

      matchCard.innerHTML = `
        <div class="match-info-header">
          <span class="match-phase">Grupo ${teamA.group}</span>
          <span class="match-time">${match.date.substring(11, 16)}</span>
        </div>
        <div class="match-teams-score">
          <div class="team home">
            <span class="team-name">${teamA.name}</span>
            <img src="${flagA}" alt="${teamA.name}" class="flag-icon" onerror="this.style.display='none'">
          </div>
          <div class="score-container">
            <input type="number" min="0" placeholder="-" class="score-input home-input" value="${valA}">
            <span class="score-separator">x</span>
            <input type="number" min="0" placeholder="-" class="score-input away-input" value="${valB}">
          </div>
          <div class="team away">
            <img src="${flagB}" alt="${teamB.name}" class="flag-icon" onerror="this.style.display='none'">
            <span class="team-name">${teamB.name}</span>
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
 */
function initScoreListener() {
  const container = document.getElementById('matches-container');
  if (!container) return;

  // Evento focusout propaga a partir dos inputs quando eles perdem o foco
  container.addEventListener('focusout', (event) => {
    const target = event.target;
    if (target.classList.contains('score-input')) {
      const matchCard = target.closest('.match-card');
      if (!matchCard) return;

      const matchId = matchCard.dataset.matchId;
      const homeInput = matchCard.querySelector('.home-input');
      const awayInput = matchCard.querySelector('.away-input');

      const valHome = homeInput.value.trim();
      const valAway = awayInput.value.trim();

      // Persiste no localStorage
      StorageService.updateMatch(matchId, valHome, valAway);

      // Re-renderiza a tabela de classificação
      renderGroups();
      
      // Opcional: Atualiza o estilo visual dos times no card
      updateCardHighlight(matchCard, valHome, valAway);
    }
  });

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
