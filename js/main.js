// main.js – ponto de entrada da aplicação

import { StorageService } from './storage.js';

// Inicializa e garante que os dados existam no localStorage ao carregar o app
const appData = StorageService.load();
console.log('Dados da Copa do Mundo de 2026 carregados:', appData);

// --- EXEMPLO DE TESTE DE PERSISTÊNCIA ---
// Descomente o bloco abaixo para testar a gravação de placares e persistência no console.
/*
console.log('Estado anterior da Partida 1 (match_01):', appData.matches['match_01']);

// Atualiza placar da partida 1: Catar 1 x 2 Equador
StorageService.updateMatch('match_01', 1, 2);

const updatedData = StorageService.load();
console.log('Novo estado da Partida 1 (match_01) após atualização:', updatedData.matches['match_01']);
*/
