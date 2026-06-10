// js/data.js

// Dados iniciais da Copa do Mundo 2026 (fase de grupos com 32 seleções de A a H)
export const INITIAL_DATA = {
  teams: [
    // Grupo A
    { id: 1, name: 'Catar', abbreviation: 'QAT', group: 'A' },
    { id: 2, name: 'Equador', abbreviation: 'ECU', group: 'A' },
    { id: 3, name: 'Senegal', abbreviation: 'SEN', group: 'A' },
    { id: 4, name: 'Holanda', abbreviation: 'NED', group: 'A' },
    // Grupo B
    { id: 5, name: 'Inglaterra', abbreviation: 'ENG', group: 'B' },
    { id: 6, name: 'Irã', abbreviation: 'IRN', group: 'B' },
    { id: 7, name: 'Estados Unidos', abbreviation: 'USA', group: 'B' },
    { id: 8, name: 'País de Gales', abbreviation: 'WAL', group: 'B' },
    // Grupo C
    { id: 9, name: 'Argentina', abbreviation: 'ARG', group: 'C' },
    { id: 10, name: 'Arábia Saudita', abbreviation: 'KSA', group: 'C' },
    { id: 11, name: 'México', abbreviation: 'MEX', group: 'C' },
    { id: 12, name: 'Polônia', abbreviation: 'POL', group: 'C' },
    // Grupo D
    { id: 13, name: 'França', abbreviation: 'FRA', group: 'D' },
    { id: 14, name: 'Austrália', abbreviation: 'AUS', group: 'D' },
    { id: 15, name: 'Dinamarca', abbreviation: 'DEN', group: 'D' },
    { id: 16, name: 'Tunísia', abbreviation: 'TUN', group: 'D' },
    // Grupo E
    { id: 17, name: 'Espanha', abbreviation: 'ESP', group: 'E' },
    { id: 18, name: 'Costa Rica', abbreviation: 'CRC', group: 'E' },
    { id: 19, name: 'Alemanha', abbreviation: 'GER', group: 'E' },
    { id: 20, name: 'Japão', abbreviation: 'JPN', group: 'E' },
    // Grupo F
    { id: 21, name: 'Bélgica', abbreviation: 'BEL', group: 'F' },
    { id: 22, name: 'Canadá', abbreviation: 'CAN', group: 'F' },
    { id: 23, name: 'Marrocos', abbreviation: 'MAR', group: 'F' },
    { id: 24, name: 'Croácia', abbreviation: 'CRO', group: 'F' },
    // Grupo G
    { id: 25, name: 'Brasil', abbreviation: 'BRA', group: 'G' },
    { id: 26, name: 'Sérvia', abbreviation: 'SRB', group: 'G' },
    { id: 27, name: 'Suíça', abbreviation: 'SUI', group: 'G' },
    { id: 28, name: 'Camarões', abbreviation: 'CMR', group: 'G' },
    // Grupo H
    { id: 29, name: 'Portugal', abbreviation: 'POR', group: 'H' },
    { id: 30, name: 'Gana', abbreviation: 'GHA', group: 'H' },
    { id: 31, name: 'Uruguai', abbreviation: 'URU', group: 'H' },
    { id: 32, name: 'Coreia do Sul', abbreviation: 'KOR', group: 'H' }
  ],
  groups: {
    A: [1, 2, 3, 4],
    B: [5, 6, 7, 8],
    C: [9, 10, 11, 12],
    D: [13, 14, 15, 16],
    E: [17, 18, 19, 20],
    F: [21, 22, 23, 24],
    G: [25, 26, 27, 28],
    H: [29, 30, 31, 32]
  },
  matches: {
    // Grupo A
    'match_01': { id: 'match_01', teamA: 1, teamB: 2, golsA: null, golsB: null, date: '2026-06-12T13:00:00Z', phase: 'group' },
    'match_02': { id: 'match_02', teamA: 3, teamB: 4, golsA: null, golsB: null, date: '2026-06-12T16:00:00Z', phase: 'group' },
    'match_03': { id: 'match_03', teamA: 1, teamB: 3, golsA: null, golsB: null, date: '2026-06-16T13:00:00Z', phase: 'group' },
    'match_04': { id: 'match_04', teamA: 4, teamB: 2, golsA: null, golsB: null, date: '2026-06-16T16:00:00Z', phase: 'group' },
    'match_05': { id: 'match_05', teamA: 4, teamB: 1, golsA: null, golsB: null, date: '2026-06-20T16:00:00Z', phase: 'group' },
    'match_06': { id: 'match_06', teamA: 2, teamB: 3, golsA: null, golsB: null, date: '2026-06-20T16:00:00Z', phase: 'group' },

    // Grupo B
    'match_07': { id: 'match_07', teamA: 5, teamB: 6, golsA: null, golsB: null, date: '2026-06-13T13:00:00Z', phase: 'group' },
    'match_08': { id: 'match_08', teamA: 7, teamB: 8, golsA: null, golsB: null, date: '2026-06-13T19:00:00Z', phase: 'group' },
    'match_09': { id: 'match_09', teamA: 5, teamB: 7, golsA: null, golsB: null, date: '2026-06-17T19:00:00Z', phase: 'group' },
    'match_10': { id: 'match_10', teamA: 8, teamB: 6, golsA: null, golsB: null, date: '2026-06-17T13:00:00Z', phase: 'group' },
    'match_11': { id: 'match_11', teamA: 8, teamB: 5, golsA: null, golsB: null, date: '2026-06-21T19:00:00Z', phase: 'group' },
    'match_12': { id: 'match_12', teamA: 6, teamB: 7, golsA: null, golsB: null, date: '2026-06-21T19:00:00Z', phase: 'group' },

    // Grupo C
    'match_13': { id: 'match_13', teamA: 9, teamB: 10, golsA: null, golsB: null, date: '2026-06-14T10:00:00Z', phase: 'group' },
    'match_14': { id: 'match_14', teamA: 11, teamB: 12, golsA: null, golsB: null, date: '2026-06-14T16:00:00Z', phase: 'group' },
    'match_15': { id: 'match_15', teamA: 9, teamB: 11, golsA: null, golsB: null, date: '2026-06-18T19:00:00Z', phase: 'group' },
    'match_16': { id: 'match_16', teamA: 12, teamB: 10, golsA: null, golsB: null, date: '2026-06-18T13:00:00Z', phase: 'group' },
    'match_17': { id: 'match_17', teamA: 12, teamB: 9, golsA: null, golsB: null, date: '2026-06-22T19:00:00Z', phase: 'group' },
    'match_18': { id: 'match_18', teamA: 10, teamB: 11, golsA: null, golsB: null, date: '2026-06-22T19:00:00Z', phase: 'group' },

    // Grupo D
    'match_19': { id: 'match_19', teamA: 13, teamB: 14, golsA: null, golsB: null, date: '2026-06-14T19:00:00Z', phase: 'group' },
    'match_20': { id: 'match_20', teamA: 15, teamB: 16, golsA: null, golsB: null, date: '2026-06-14T13:00:00Z', phase: 'group' },
    'match_21': { id: 'match_21', teamA: 13, teamB: 15, golsA: null, golsB: null, date: '2026-06-18T16:00:00Z', phase: 'group' },
    'match_22': { id: 'match_22', teamA: 16, teamB: 14, golsA: null, golsB: null, date: '2026-06-18T10:00:00Z', phase: 'group' },
    'match_23': { id: 'match_23', teamA: 16, teamB: 13, golsA: null, golsB: null, date: '2026-06-22T15:00:00Z', phase: 'group' },
    'match_24': { id: 'match_24', teamA: 14, teamB: 15, golsA: null, golsB: null, date: '2026-06-22T15:00:00Z', phase: 'group' },

    // Grupo E
    'match_25': { id: 'match_25', teamA: 17, teamB: 18, golsA: null, golsB: null, date: '2026-06-15T16:00:00Z', phase: 'group' },
    'match_26': { id: 'match_26', teamA: 19, teamB: 20, golsA: null, golsB: null, date: '2026-06-15T13:00:00Z', phase: 'group' },
    'match_27': { id: 'match_27', teamA: 17, teamB: 19, golsA: null, golsB: null, date: '2026-06-19T19:00:00Z', phase: 'group' },
    'match_28': { id: 'match_28', teamA: 20, teamB: 18, golsA: null, golsB: null, date: '2026-06-19T10:00:00Z', phase: 'group' },
    'match_29': { id: 'match_29', teamA: 20, teamB: 17, golsA: null, golsB: null, date: '2026-06-23T19:00:00Z', phase: 'group' },
    'match_30': { id: 'match_30', teamA: 18, teamB: 19, golsA: null, golsB: null, date: '2026-06-23T19:00:00Z', phase: 'group' },

    // Grupo F
    'match_31': { id: 'match_31', teamA: 21, teamB: 22, golsA: null, golsB: null, date: '2026-06-15T19:00:00Z', phase: 'group' },
    'match_32': { id: 'match_32', teamA: 23, teamB: 24, golsA: null, golsB: null, date: '2026-06-15T10:00:00Z', phase: 'group' },
    'match_33': { id: 'match_33', teamA: 21, teamB: 23, golsA: null, golsB: null, date: '2026-06-19T13:00:00Z', phase: 'group' },
    'match_34': { id: 'match_34', teamA: 24, teamB: 22, golsA: null, golsB: null, date: '2026-06-19T16:00:00Z', phase: 'group' },
    'match_35': { id: 'match_35', teamA: 24, teamB: 21, golsA: null, golsB: null, date: '2026-06-23T15:00:00Z', phase: 'group' },
    'match_36': { id: 'match_36', teamA: 22, teamB: 23, golsA: null, golsB: null, date: '2026-06-23T15:00:00Z', phase: 'group' },

    // Grupo G
    'match_37': { id: 'match_37', teamA: 25, teamB: 26, golsA: null, golsB: null, date: '2026-06-16T19:00:00Z', phase: 'group' },
    'match_38': { id: 'match_38', teamA: 27, teamB: 28, golsA: null, golsB: null, date: '2026-06-16T10:00:00Z', phase: 'group' },
    'match_39': { id: 'match_39', teamA: 25, teamB: 27, golsA: null, golsB: null, date: '2026-06-20T13:00:00Z', phase: 'group' },
    'match_40': { id: 'match_40', teamA: 28, teamB: 26, golsA: null, golsB: null, date: '2026-06-20T10:00:00Z', phase: 'group' },
    'match_41': { id: 'match_41', teamA: 28, teamB: 25, golsA: null, golsB: null, date: '2026-06-24T19:00:00Z', phase: 'group' },
    'match_42': { id: 'match_42', teamA: 26, teamB: 27, golsA: null, golsB: null, date: '2026-06-24T19:00:00Z', phase: 'group' },

    // Grupo H
    'match_43': { id: 'match_43', teamA: 29, teamB: 30, golsA: null, golsB: null, date: '2026-06-17T16:00:00Z', phase: 'group' },
    'match_44': { id: 'match_44', teamA: 31, teamB: 32, golsA: null, golsB: null, date: '2026-06-17T10:00:00Z', phase: 'group' },
    'match_45': { id: 'match_45', teamA: 29, teamB: 31, golsA: null, golsB: null, date: '2026-06-21T16:00:00Z', phase: 'group' },
    'match_46': { id: 'match_46', teamA: 32, teamB: 30, golsA: null, golsB: null, date: '2026-06-21T13:00:00Z', phase: 'group' },
    'match_47': { id: 'match_47', teamA: 32, teamB: 29, golsA: null, golsB: null, date: '2026-06-25T15:00:00Z', phase: 'group' },
    'match_48': { id: 'match_48', teamA: 30, teamB: 31, golsA: null, golsB: null, date: '2026-06-25T15:00:00Z', phase: 'group' }
  }
};
