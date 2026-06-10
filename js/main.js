// js/main.js – ponto de entrada da aplicação

import { StorageService } from './storage.js';
import { initUI } from './ui.js';

// Garante que os dados sejam inicializados no localStorage e inicia a interface
document.addEventListener('DOMContentLoaded', () => {
  StorageService.load();
  initUI();
});
