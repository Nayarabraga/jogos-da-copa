// js/storage.js

import { INITIAL_DATA } from './data.js';

const STORAGE_KEY = 'world_cup_2026_data';

export const StorageService = {
  /**
   * Carrega os dados do localStorage.
   * Caso esteja vazio, inicializa com INITIAL_DATA.
   */
  load() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      this.save(INITIAL_DATA);
      return INITIAL_DATA;
    }
    try {
      return JSON.parse(rawData);
    } catch (error) {
      // Caso ocorra erro de parsing, restaura os dados padrão
      console.error('Erro ao ler os dados do localStorage. Restaurando dados iniciais.', error);
      this.save(INITIAL_DATA);
      return INITIAL_DATA;
    }
  },

  /**
   * Salva os dados no localStorage.
   */
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar os dados no localStorage.', error);
    }
  },

  /**
   * Atualiza o placar de uma partida específica e persiste.
   */
  updateMatch(matchId, golsA, golsB) {
    const data = this.load();
    if (data.matches && data.matches[matchId]) {
      // Converte valores para número ou mantém null se vazios
      const parseGoals = (val) => {
        if (val === null || val === undefined || val === '') return null;
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? null : parsed;
      };

      data.matches[matchId].golsA = parseGoals(golsA);
      data.matches[matchId].golsB = parseGoals(golsB);
      this.save(data);
    } else {
      console.warn(`Partida com o ID "${matchId}" não encontrada para atualização.`);
    }
  }
};
