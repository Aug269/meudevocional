/**
 * MEU DEVOCIONAL - APP PRINCIPAL
 * Inicialização, orquestração e gerenciamento de eventos
 */

const App = (() => {
  let timerInterval = null;

  function inicializar() {
    // 1. Carrega dados do armazenamento local
    const devAtual = Estado.devocionalAtual;
    if (devAtual && devAtual.corLiturgica) {
      definirCorLiturgica(devAtual.corLiturgica);
    }

    // 2. Inscreve a função de renderização no estado
    Estado.inscrever(() => {
      renderizarApp();
    });

    // 3. Inicializa roteamento por hash
    Navegacao.inicializarRotas();

    // 4. Primeira renderização
    renderizarApp();

    // 5. Configura delegação de eventos globais
    configurarEventosGlobais();
  }

  function definirCorLiturgica(corHex) {
    if (!corHex) return;
    document.documentElement.style.setProperty('--lit', corHex);
  }

  function renderizarApp() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    // Toast de notificação
    const toastHtml = Estado.mensagemToast ? `
      <div style="position: fixed; top: 16px; left: 50%; transform: translateX(-50%); 
                  background: var(--card); border: 1px solid var(--lit); border-radius: 999px; 
                  padding: 10px 20px; font-weight: 700; font-size: 14px; color: var(--lit); 
                  box-shadow: 0 4px 14px rgba(0,0,0,0.15); z-index: 999;">
        ${Estado.mensagemToast}
      </div>
    ` : '';

    appEl.innerHTML = `
      ${toastHtml}
      <main id="conteudo-principal">
        ${Telas.renderizar(Estado)}
      </main>
      ${Navegacao.renderizarBarra(Estado.abaAtiva)}
    `;

    // Atualiza cor litúrgica se o devocional mudou
    if (Estado.devocionalAtual && Estado.devocionalAtual.corLiturgica) {
      definirCorLiturgica(Estado.devocionalAtual.corLiturgica);
    }
  }

  function configurarEventosGlobais() {
    document.addEventListener('click', (e) => {
      // Concluir devocional hoje
      if (e.target && (e.target.id === 'btn-concluir-devocional' || e.target.closest('#btn-concluir-devocional'))) {
        e.preventDefault();
        alternarConclusaoDevocional();
      }

      // Alternar leitura devocional
      if (e.target && (e.target.id === 'btn-toggle-devocionais' || e.target.closest('#btn-toggle-devocionais'))) {
        e.preventDefault();
        alternarDevocional();
      }

      // Salvar anotação rápida na tela principal
      if (e.target && (e.target.id === 'btn-salvar-anotacao-rapida' || e.target.closest('#btn-salvar-anotacao-rapida'))) {
        e.preventDefault();
        salvarAnotacaoRapida();
      }
    });
  }

  // ==========================================
  // AÇÕES DO DEVOCIONAL
  // ==========================================
  function alternarConclusaoDevocional() {
    const dev = Estado.devocionalAtual;
    if (!dev) return;

    const jaConcluido = Armazenamento.foiConcluidoHoje(dev.id);
    if (jaConcluido) {
      Armazenamento.removerConclusaoDevocional(dev.id);
      Estado.mostrarMensagem('Devocional desmarcado.');
    } else {
      Armazenamento.salvarConclusaoDevocional(dev.id);
      Estado.mostrarMensagem('✓ Parabéns! Devocional concluído hoje.');
    }
    Estado.notificar();
  }

  function alternarDevocional() {
    const total = Estado.devocionais.length;
    if (total <= 1) return;

    const proximoIndice = (Estado.indiceDevocionalAtual + 1) % total;
    Estado.atualizar({ indiceDevocionalAtual: proximoIndice });
  }

  function salvarAnotacaoRapida() {
    const textarea = document.getElementById('texto-anotacao-rapida');
    if (!textarea) return;

    const texto = textarea.value.trim();
    if (!texto) {
      Estado.mostrarMensagem('Por favor, digite uma reflexão antes de salvar.');
      return;
    }

    const dev = Estado.devocionalAtual;
    Armazenamento.salvarAnotacao({
      titulo: dev ? `Reflexão: ${dev.titulo}` : 'Minha Reflexão',
      texto: texto,
      tag: 'Reflexão'
    });

    textarea.value = '';
    Estado.mostrarMensagem('✓ Anotação salva com sucesso no seu Diário!');
  }

  // ==========================================
  // TIMER DE ORAÇÃO & SILÊNCIO
  // ==========================================
  function selecionarPresetTimer(minutos) {
    pausarTimer();
    const segundos = minutos * 60;
    Estado.timer.minutosSelecionados = minutos;
    Estado.timer.segundosTotais = segundos;
    Estado.timer.segundosRestantes = segundos;
    Estado.timer.rodando = false;
    Estado.notificar();
  }

  function iniciarTimer() {
    if (Estado.timer.rodando) return;

    Estado.timer.rodando = true;
    Estado.notificar();

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (Estado.timer.segundosRestantes > 0) {
        Estado.timer.segundosRestantes--;

        // Atualização rápida direta do DOM para evitar re-render completo a cada segundo
        const visor = document.getElementById('visor-timer');
        if (visor) {
          const m = Math.floor(Estado.timer.segundosRestantes / 60);
          const s = Estado.timer.segundosRestantes % 60;
          visor.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
      } else {
        // Timer concluído!
        pausarTimer();
        tocarAlertaConclusao();
        Estado.mostrarMensagem('🕊️ Momento de oração concluído! Que a paz de Deus permaneça com você.', 5000);
        Estado.notificar();
      }
    }, 1000);
  }

  function pausarTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    Estado.timer.rodando = false;
    Estado.notificar();
  }

  function reiniciarTimer() {
    pausarTimer();
    Estado.timer.segundosRestantes = Estado.timer.segundosTotais;
    Estado.notificar();
  }

  function tocarAlertaConclusao() {
    // Alerta sonoro suave usando Web Audio API sem depender de arquivos externos
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.5); // E5

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch (e) {
      console.log('Audio contextual silencioso:', e);
    }

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  // ==========================================
  // EXAME DE CONSCIÊNCIA
  // ==========================================
  function alternarPerguntaExame(idPergunta, checado) {
    const exame = Armazenamento.obterExameHoje();
    if (!exame.respostas) exame.respostas = {};
    exame.respostas[idPergunta] = checado;
    Armazenamento.salvarExameHoje(exame.respostas, exame.proposito, exame.concluido);
  }

  function finalizarExame() {
    const textarea = document.getElementById('texto-proposito-exame');
    const proposito = textarea ? textarea.value.trim() : '';

    const exame = Armazenamento.obterExameHoje();
    Armazenamento.salvarExameHoje(exame.respostas, proposito, true);

    Estado.mostrarMensagem('✓ Exame de Consciência concluído! Uma noite de paz.');
    Estado.notificar();
  }

  // ==========================================
  // CADERNO ESPIRITUAL
  // ==========================================
  function selecionarTagFormulario(tag) {
    Estado.formularioDiario.tag = tag;
    const botoes = document.querySelectorAll('#chips-tags-diario .chip');
    botoes.forEach((btn) => {
      if (btn.getAttribute('data-tag') === tag) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function salvarNovaNotaDiario() {
    const inputTitulo = document.getElementById('input-diario-titulo');
    const textareaConteudo = document.getElementById('textarea-diario-conteudo');

    if (!textareaConteudo) return;

    const titulo = inputTitulo ? inputTitulo.value.trim() : '';
    const texto = textareaConteudo.value.trim();

    if (!texto) {
      Estado.mostrarMensagem('Digite o conteúdo da sua reflexão antes de salvar.');
      return;
    }

    Armazenamento.salvarAnotacao({
      titulo: titulo || 'Reflexão Espiritual',
      texto: texto,
      tag: Estado.formularioDiario.tag || 'Reflexão'
    });

    if (inputTitulo) inputTitulo.value = '';
    textareaConteudo.value = '';

    Estado.mostrarMensagem('✓ Anotação adicionada ao Caderno Espiritual!');
    Estado.notificar();
  }

  function removerNotaDiario(id) {
    if (confirm('Deseja excluir esta anotação do seu diário espiritual?')) {
      Armazenamento.excluirAnotacao(id);
      Estado.mostrarMensagem('Anotação excluída.');
      Estado.notificar();
    }
  }

  return {
    inicializar,
    selecionarPresetTimer,
    iniciarTimer,
    pausarTimer,
    reiniciarTimer,
    alternarPerguntaExame,
    finalizarExame,
    selecionarTagFormulario,
    salvarNovaNotaDiario,
    removerNotaDiario
  };
})();

// Inicializa a aplicação assim que o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.inicializar);
} else {
  App.inicializar();
}
