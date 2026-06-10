// js/main.js – ponto de entrada da aplicação

import { StorageService } from './storage.js';
import { initUI } from './ui.js';

/**
 * Exibe feedback visual de "salvo" no input de placar.
 * Adiciona a classe `.saved` por 1500ms e depois a remove (fade-out via CSS).
 * @param {HTMLElement} inputEl - O input que acabou de ser atualizado.
 */
export function showSaveFeedback(inputEl) {
  if (!inputEl) return;
  inputEl.classList.remove('saved'); // garante reset caso ainda esteja ativo

  // Força reflow para reiniciar a transição CSS caso o timer anterior não terminou
  void inputEl.offsetWidth;

  inputEl.classList.add('saved');
  setTimeout(() => inputEl.classList.remove('saved'), 1500);
}

/**
 * Inicializa o botão "Resetar Dados" com confirmação via window.confirm.
 * Limpa o localStorage e recarrega a página em caso de confirmação.
 */
function initResetButton() {
  const btn = document.getElementById('btn-reset-data');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const confirmado = window.confirm(
      'Tem certeza que deseja resetar todos os dados?\n\nTodos os placares salvos serão apagados e a página será recarregada.'
    );
    if (confirmado) {
      localStorage.clear();
      location.reload();
    }
  });
}

// Garante que os dados sejam inicializados no localStorage e inicia a interface
document.addEventListener('DOMContentLoaded', () => {
  StorageService.load();
  initUI();
  initResetButton();
});
