/**
 * MEU DEVOCIONAL - APP PRINCIPAL
 * Inicialização e delegação de eventos do Lecionário Comum Revisado
 */

const App = (() => {
  let tm = null;

  function inicializar() {
    Estado.ver = Armazenamento.obterVersaoBiblia();
    Estado.mode = Armazenamento.obterModo();
    Estado.leituraPrefs = Armazenamento.obterPreferenciasLeitura();

    if (typeof Notificacoes !== 'undefined') {
      Notificacoes.inicializar();
    }

    Estado.inscrever(() => {
      render();
    });

    configurarEventos();
    render();
  }

  function render() {
    clearInterval(tm);
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const prefs = Estado.leituraPrefs || (typeof Armazenamento !== 'undefined' ? Armazenamento.obterPreferenciasLeitura() : { tamanho: 'md', tema: 'sepia', serif: true });
    document.documentElement.setAttribute('data-reading-theme', prefs.tema || 'sepia');
    document.documentElement.setAttribute('data-reading-size', prefs.tamanho || 'md');
    document.documentElement.setAttribute('data-reading-font', prefs.serif ? 'serif' : 'sans');

    appEl.innerHTML = Telas.render(Estado);
    Navegacao.atualizarBarra(Estado.screen);

    const ta = document.getElementById('ta');
    if (ta) {
      ta.addEventListener('input', () => {
        Estado.ans = ta.value;
      });
    }

    const taReflexao = document.getElementById('ta-nova-reflexao');
    if (taReflexao) {
      taReflexao.addEventListener('input', () => {
        Estado.rascunhoReflexao = taReflexao.value;
      });
    }

    const taChat = document.getElementById('ta-chat-msg');
    if (taChat) {
      taChat.addEventListener('input', () => {
        Estado.rascunhoChat = taChat.value;
      });
      taChat.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          enviarChat();
        }
      });
    }

    const chatBox = document.getElementById('chat-mensagens-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    if (Estado.screen !== 'chat') {
      window.scrollTo(0, 0);
    }
  }

  async function enviarChat() {
    const taChat = document.getElementById('ta-chat-msg');
    const texto = taChat ? taChat.value.trim() : (Estado.rascunhoChat || '').trim();
    if (!texto || Estado.chatCarregando) return;

    const novaMensagem = {
      role: 'user',
      content: texto,
      timestamp: Date.now()
    };

    Estado.chatMensagens = [...(Estado.chatMensagens || []), novaMensagem];
    Estado.rascunhoChat = '';
    Estado.chatCarregando = true;
    render();

    // Sincroniza mensagem do usuário no Firestore se autenticado
    if (typeof FirebaseService !== 'undefined') {
      FirebaseService.salvarMensagemChatFirestore(novaMensagem).catch(() => {});
    }

    try {
      const resposta = await GeminiService.enviarMensagem(Estado.chatMensagens, Estado.chatModelo);
      const msgModelo = {
        role: 'model',
        content: resposta,
        timestamp: Date.now()
      };
      Estado.chatMensagens = [...Estado.chatMensagens, msgModelo];

      // Sincroniza resposta no Firestore se autenticado
      if (typeof FirebaseService !== 'undefined') {
        FirebaseService.salvarMensagemChatFirestore(msgModelo).catch(() => {});
      }
    } catch (err) {
      Estado.chatMensagens = [
        ...Estado.chatMensagens,
        {
          role: 'model',
          content: 'Desculpe, ocorreu um erro de conexão. Que a paz de Cristo guarde seu coração; tente novamente em instantes.',
          timestamp: Date.now()
        }
      ];
    } finally {
      Estado.chatCarregando = false;
      render();
    }
  }

  function finalizar() {
    const day = Estado.diaAtual;
    const m = MODES[Estado.mode] || MODES.padrao;

    Armazenamento.registrarConclusao(day.key);
    Armazenamento.marcarParteDevocional(day.key, 'scripture', true);
    Armazenamento.marcarParteDevocional(day.key, 'reflection', true);
    Armazenamento.marcarParteDevocional(day.key, 'prayer', true);

    if (Estado.ans.trim()) {
      Armazenamento.salvarReflexao({
        data: day.label,
        modo: m.n,
        titulo: (Estado.passosAtuais.exame && Estado.passosAtuais.exame.h) || 'Exame',
        pergunta: (Estado.passosAtuais.exame && Estado.passosAtuais.exame.h) || '',
        texto: Estado.ans.trim(),
        referencia: day.vref || ''
      });
    }

    Estado.atualizar({ screen: 'done' });
  }

  function configurarEventos() {
    document.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-a],[data-go]');
      if (!b) return;

      if (b.dataset.go) {
        Estado.atualizar({
          screen: b.dataset.go,
          showModes: false,
          showDays: false
        });
        return;
      }

      const a = b.dataset.a;

      if (a === 'tog') {
        Estado.atualizar({ showModes: !Estado.showModes });
      } else if (a === 'togday') {
        Estado.atualizar({ showDays: !Estado.showDays });
      } else if (a === 'setday') {
        Estado.atualizar({
          diaIndex: +b.dataset.k,
          showDays: false,
          i: 0,
          ans: ''
        });
      } else if (a === 'tog_parte') {
        const parte = b.dataset.parte;
        if (parte) {
          Armazenamento.alternarParteDevocional(Estado.diaAtual.key, parte);
          render();
        }
      } else if (a === 'toggle_lembrete') {
        if (typeof Notificacoes !== 'undefined') {
          Notificacoes.alternarAtivacao().then(() => {
            render();
          });
        }
      } else if (a === 'abrir_config_lembrete') {
        const conf = Armazenamento.obterConfigNotificacoes();
        Estado.atualizar({
          modalLembreteAberto: true,
          tempLembreteHorario: conf.horario || '07:00',
          feedbackLembrete: null
        });
      } else if (a === 'fechar_modal_lembrete') {
        Estado.atualizar({
          modalLembreteAberto: false,
          feedbackLembrete: null
        });
      } else if (a === 'set_horario_rapido') {
        const h = b.dataset.h;
        if (h) {
          Estado.tempLembreteHorario = h;
          const inputEl = document.getElementById('input-lembrete-horario');
          if (inputEl) inputEl.value = h;
          render();
        }
      } else if (a === 'solicitar_perm_notif') {
        if (typeof Notificacoes !== 'undefined') {
          Notificacoes.solicitarPermissao().then((status) => {
            if (status === 'granted') {
              Estado.feedbackLembrete = { tipo: 'sucesso', texto: '✓ Permissão concedida! Agora você pode ativar seus lembretes.' };
            } else if (status === 'denied') {
              Estado.feedbackLembrete = { tipo: 'erro', texto: '⚠️ Permissão negada pelo navegador/sistema.' };
            }
            render();
          });
        }
      } else if (a === 'testar_notificacao_modal') {
        if (typeof Notificacoes !== 'undefined') {
          Notificacoes.dispararTeste().then((ok) => {
            Estado.feedbackLembrete = {
              tipo: 'sucesso',
              texto: '🔔 Alerta sonoro e notificação disparados com sucesso!'
            };
            render();
          });
        }
      } else if (a === 'testar_lembrete_rapido') {
        if (typeof Notificacoes !== 'undefined') {
          Notificacoes.dispararTeste();
        }
      } else if (a === 'salvar_modal_lembrete') {
        const inputH = document.getElementById('input-lembrete-horario');
        const selectM = document.getElementById('select-lembrete-msg');
        const horarioEscolhido = (inputH ? inputH.value : (Estado.tempLembreteHorario || '07:00')) || '07:00';
        const msgEscolhida = selectM ? selectM.value : 'Hora do seu devocional diário: um momento com a Palavra e em oração.';

        if (typeof Notificacoes !== 'undefined') {
          Notificacoes.salvarHorario(horarioEscolhido, msgEscolhida);
          Armazenamento.salvarConfigNotificacoes({ ativo: true });
          if (typeof Notificacoes.solicitarPermissao === 'function') {
            Notificacoes.solicitarPermissao();
          }
        }

        Estado.atualizar({
          feedbackLembrete: { tipo: 'sucesso', texto: `✓ Lembrete ativado para todos os dias às ${horarioEscolhido}!` }
        });

        setTimeout(() => {
          Estado.atualizar({
            modalLembreteAberto: false,
            feedbackLembrete: null
          });
        }, 1200);
      } else if (a === 'abrir_modo_leitura') {
        Estado.atualizar({
          prev: Estado.screen,
          screen: 'focus_read',
          showModes: false,
          showDays: false
        });
      } else if (a === 'sair_modo_leitura') {
        const destino = Estado.prev === 'focus_read' ? 'home' : (Estado.prev || 'home');
        Estado.atualizar({ screen: destino });
      } else if (a === 'leitura_tam_menos') {
        const tamanhos = ['sm', 'md', 'lg', 'xl'];
        const cur = (Estado.leituraPrefs && Estado.leituraPrefs.tamanho) || 'md';
        const idx = tamanhos.indexOf(cur);
        if (idx > 0) {
          Estado.leituraPrefs = Armazenamento.salvarPreferenciasLeitura({ tamanho: tamanhos[idx - 1] });
          Estado.notificar();
        }
      } else if (a === 'leitura_tam_mais') {
        const tamanhos = ['sm', 'md', 'lg', 'xl'];
        const cur = (Estado.leituraPrefs && Estado.leituraPrefs.tamanho) || 'md';
        const idx = tamanhos.indexOf(cur);
        if (idx < tamanhos.length - 1) {
          Estado.leituraPrefs = Armazenamento.salvarPreferenciasLeitura({ tamanho: tamanhos[idx + 1] });
          Estado.notificar();
        }
      } else if (a === 'leitura_fonte_toggle') {
        const novoSerif = !((Estado.leituraPrefs && Estado.leituraPrefs.serif) ?? true);
        Estado.leituraPrefs = Armazenamento.salvarPreferenciasLeitura({ serif: novoSerif });
        Estado.notificar();
      } else if (a === 'leitura_tema') {
        const novoTema = b.dataset.tema;
        if (novoTema) {
          Estado.leituraPrefs = Armazenamento.salvarPreferenciasLeitura({ tema: novoTema });
          Estado.notificar();
        }
      } else if (a === 'concluir_leitura_foco') {
        const dKey = Estado.diaAtual.key;
        Armazenamento.marcarParteDevocional(dKey, 'scripture', true);
        Armazenamento.marcarParteDevocional(dKey, 'reflection', true);
        Armazenamento.marcarParteDevocional(dKey, 'prayer', true);
        Armazenamento.registrarConclusao(dKey);
        Estado.atualizar({ screen: 'done' });
      } else if (a === 'iniciar_reflexao') {
        const m = MODES[Estado.mode] || MODES.padrao;
        let idx = m.s.findIndex((s) => s === 'meditacao' || s === 'exame' || s === 'meditar');
        if (idx < 0) {
          Estado.mode = 'padrao';
          Armazenamento.salvarModo('padrao');
          idx = MODES.padrao.s.findIndex((s) => s === 'meditacao' || s === 'exame');
        }
        Estado.atualizar({ screen: 'step', i: idx >= 0 ? idx : 0, ans: '' });
      } else if (a === 'iniciar_oracao') {
        const m = MODES[Estado.mode] || MODES.padrao;
        let idx = m.s.findIndex((s) => s === 'oracao' || s === 'orar' || s === 'descansar');
        if (idx < 0) {
          Estado.mode = 'padrao';
          Armazenamento.salvarModo('padrao');
          idx = MODES.padrao.s.findIndex((s) => s === 'oracao');
        }
        Estado.atualizar({ screen: 'step', i: idx >= 0 ? idx : m.s.length - 1, ans: '' });
      } else if (a === 'read') {
        Armazenamento.marcarParteDevocional(Estado.diaAtual.key, 'scripture', true);
        Estado.atualizar({
          prev: Estado.screen,
          r: +b.dataset.r,
          screen: 'read'
        });
      } else if (a === 'rback') {
        Estado.atualizar({ screen: Estado.prev });
      } else if (a === 'ver') {
        Estado.ver = b.dataset.k;
        Armazenamento.salvarVersaoBiblia(Estado.ver);
        Estado.notificar();
      } else if (a === 'rprev') {
        if (Estado.r > 0) {
          Estado.atualizar({ r: Estado.r - 1 });
        }
      } else if (a === 'rnext') {
        if (Estado.r < Estado.diaAtual.reads.length - 1) {
          Estado.atualizar({ r: Estado.r + 1 });
        }
      } else if (a === 'mode') {
        Estado.mode = b.dataset.k;
        Armazenamento.salvarModo(Estado.mode);
        Estado.atualizar({ showModes: false });
      } else if (a === 'start') {
        Estado.atualizar({ screen: 'step', i: 0, ans: '' });
      } else if (a === 'swap') {
        Estado.mode = b.dataset.k;
        Armazenamento.salvarModo(Estado.mode);
        Estado.atualizar({ i: 0 });
      } else if (a === 'back') {
        if (Estado.i > 0) {
          Estado.atualizar({ i: Estado.i - 1 });
        } else {
          Estado.atualizar({ screen: 'home' });
        }
      } else if (a === 'next') {
        const m = MODES[Estado.mode] || MODES.padrao;
        const passoKey = m.s[Estado.i];
        if (passoKey === 'palavra' || passoKey === 'ler') {
          Armazenamento.marcarParteDevocional(Estado.diaAtual.key, 'scripture', true);
        } else if (passoKey === 'meditacao' || passoKey === 'exame' || passoKey === 'meditar') {
          Armazenamento.marcarParteDevocional(Estado.diaAtual.key, 'reflection', true);
        } else if (passoKey === 'oracao' || passoKey === 'orar' || passoKey === 'descansar') {
          Armazenamento.marcarParteDevocional(Estado.diaAtual.key, 'prayer', true);
        }

        if (Estado.i < m.s.length - 1) {
          Estado.atualizar({ i: Estado.i + 1 });
        } else {
          finalizar();
        }
      } else if (a === 'diary') {
        Estado.atualizar({ screen: 'diary' });
      } else if (a === 'home') {
        Estado.atualizar({ screen: 'home' });
      } else if (a === 'salvarreflexao') {
        const ta = document.getElementById('ta-nova-reflexao');
        const texto = ta ? ta.value.trim() : (Estado.rascunhoReflexao || '').trim();
        if (!texto) {
          if (ta) ta.focus();
          return;
        }
        Armazenamento.salvarReflexao({
          texto: texto,
          titulo: 'Reflexão Pessoal',
          data: Estado.diaAtual.label,
          modo: 'Diário Pessoal',
          referencia: Estado.diaAtual.vref || ''
        });
        Estado.rascunhoReflexao = '';
        if (typeof FirebaseService !== 'undefined' && FirebaseService.estaAutenticado()) {
          FirebaseService.sincronizarComFirestore().catch(() => {});
        }
        render();
      } else if (a === 'delreflexao') {
        const id = b.dataset.id;
        if (id && confirm('Deseja excluir esta reflexão do seu diário?')) {
          Armazenamento.excluirReflexao(id);
          render();
        }
      } else if (a === 'exportardiario') {
        const resultado = Armazenamento.exportarDiarioParaArquivo();
        Estado.mensagemExportacao = resultado.mensagem;
        render();
        setTimeout(() => {
          Estado.mensagemExportacao = null;
          render();
        }, 4000);
      } else if (a === 'outro_versiculo') {
        Estado.atualizar({ versiculoOffset: (Estado.versiculoOffset || 0) + 1 });
      } else if (a === 'enviar_chat') {
        enviarChat();
      } else if (a === 'sugerir_chat') {
        const sugestao = b.dataset.t;
        if (sugestao) {
          Estado.rascunhoChat = sugestao;
          render();
          enviarChat();
        }
      } else if (a === 'set_chat_modelo') {
        Estado.atualizar({ chatModelo: b.dataset.k });
      } else if (a === 'limpar_chat') {
        Estado.chatMensagens = [
          {
            role: 'model',
            content: 'Graça e paz! Sou seu Conselheiro Bíblico no Meu Devocional. Como posso ajudar você hoje na sua meditação do Lecionário Comum Revisado ou na aplicação das Escrituras?',
            timestamp: Date.now()
          }
        ];
        Estado.rascunhoChat = '';
        render();
      } else if (a === 'login_google') {
        if (typeof FirebaseService !== 'undefined') {
          FirebaseService.entrarComGoogle()
            .then(() => render())
            .catch((e) => alert(e.message));
        }
      } else if (a === 'logout_google') {
        if (typeof FirebaseService !== 'undefined') {
          FirebaseService.sair().finally(() => render());
        }
      } else if (a === 'sincronizar_nuvem') {
        if (typeof FirebaseService !== 'undefined') {
          b.textContent = 'Sincronizando…';
          FirebaseService.sincronizarComFirestore().then((r) => {
            b.textContent = r && r.sucesso ? 'Sincronizado ✓' : 'Falhou ✕';
            if (r && !r.sucesso) alert('Não foi possível sincronizar: ' + r.erro);
            setTimeout(() => {
              render();
            }, 1200);
          });
        }
      } else if (a === 'timer') {
        let t = 120;
        const el = document.getElementById('tmr');
        b.textContent = 'Em silêncio…';
        clearInterval(tm);
        tm = setInterval(() => {
          t--;
          if (el) {
            el.textContent = Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
          }
          if (t <= 0) {
            clearInterval(tm);
            b.textContent = 'Silêncio concluído';
          }
        }, 1000);
      }
    });
  }

  // Atualiza a tela quando o usuário entra ou sai da conta Google
  window.addEventListener('md-auth-mudou', () => render());

  return {
    inicializar
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.inicializar);
} else {
  App.inicializar();
}
