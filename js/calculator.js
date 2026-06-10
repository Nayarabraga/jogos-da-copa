// js/calculator.js

/**
 * Calcula a classificação de cada time com base nas partidas e seleções.
 * Ordena os times seguindo as regras da FIFA.
 * @param {Array|Object} matches - Partidas da Copa.
 * @param {Array} teams - Lista de seleções participantes.
 * @returns {Array} Classificação calculada e ordenada.
 */
export function calculateStandings(matches, teams) {
  const matchList = Array.isArray(matches) ? matches : Object.values(matches || {});
  const teamList = teams || [];

  // Inicializa o mapa com estatísticas zeradas para cada time
  const standingsMap = teamList.reduce((acc, team) => {
    acc[team.id] = {
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
    return acc;
  }, {});

  // Acumula os dados das partidas disputadas utilizando reduce
  matchList.reduce((acc, match) => {
    const { teamA, teamB, golsA, golsB } = match;

    // Apenas partidas com placar preenchido são contabilizadas
    if (golsA !== null && golsB !== null && golsA !== undefined && golsB !== undefined) {
      const tA = acc[teamA];
      const tB = acc[teamB];

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
    return acc;
  }, standingsMap);

  // Calcula o saldo de gols de cada time
  const standings = Object.values(standingsMap);
  standings.forEach(t => {
    t.goalDifference = t.goalsFor - t.goalsAgainst;
  });

  // Ordenação de acordo com os critérios FIFA: Pontos > Saldo de Gols > Gols Pró
  return standings.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    if (b.goalsFor !== a.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }
    // Desempate secundário por ordem alfabética do nome
    return a.name.localeCompare(b.name);
  });
}
