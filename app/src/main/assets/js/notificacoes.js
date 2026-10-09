/**
 * MEU DEVOCIONAL - SISTEMA DE NOTIFICAÇÕES E LEMBRETES DIÁRIOS
 * Integração híbrida:
 * - API nativa do Android (AlarmManager via AndroidBridge)
 * - Web Notifications API do navegador com agendamento local
 */

const Notificacoes = (() => {
  let timerVerificacao = null;
  let audioContext = null;

  function tocarSinoSuave() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const agora = audioContext.currentTime;
      // Três notas harmônicas suaves formando um sino devocional (D5, F#5, A5)
      const frequencias = [587.33, 739.99, 880.00];

      frequencias.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, agora + idx * 0.12);

        gain.gain.setValueAtTime(0.001, agora + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.2, agora + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, agora + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(agora + idx * 0.12);
        osc.stop(agora + idx * 0.12 + 1.3);
      });
    } catch (e) {
      // Áudio silenciado ou bloqueado
    }
  }

  function eAndroidNativo() {
    return typeof window !== 'undefined' &&
      window.AndroidBridge &&
      typeof window.AndroidBridge.scheduleDailyReminder === 'function';
  }

  function suportaWebNotification() {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  function obterStatusPermissao() {
    if (eAndroidNativo()) {
      try {
        const permitida = window.AndroidBridge.hasNotificationPermission();
        return permitida ? 'granted' : 'default';
      } catch (e) {
        return 'granted';
      }
    }

    if (suportaWebNotification()) {
      return Notification.permission; // 'granted', 'denied', 'default'
    }

    return 'unsupported';
  }

  async function solicitarPermissao() {
    if (eAndroidNativo()) {
      try {
        if (typeof window.AndroidBridge.requestNotificationPermission === 'function') {
          window.AndroidBridge.requestNotificationPermission();
        }
        return 'granted';
      } catch (e) {
        return 'granted';
      }
    }

    if (suportaWebNotification()) {
      try {
        const resultado = await Notification.requestPermission();
        return resultado;
      } catch (e) {
        console.warn('Erro ao solicitar permissão de notificação:', e);
        return 'denied';
      }
    }

    return 'unsupported';
  }

  function obterDataHojeFormatada() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  function obterHorarioAtualFormatado() {
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    return `${hora}:${minuto}`;
  }

  function exibirNotificacao(titulo, mensagem) {
    const config = Armazenamento.obterConfigNotificacoes();
    if (config.som) {
      tocarSinoSuave();
    }

    // 1. Tenta disparar nativamente via AndroidBridge
    if (eAndroidNativo()) {
      try {
        window.AndroidBridge.showImmediateNotification(titulo, mensagem);
        return true;
      } catch (e) {
        console.warn('Falha ao disparar notificação nativa:', e);
      }
    }

    // 2. Dispara via Web Notification API
    if (suportaWebNotification() && Notification.permission === 'granted') {
      try {
        const n = new Notification(titulo, {
          body: mensagem,
          icon: 'favicon.ico',
          badge: 'favicon.ico',
          tag: 'meu-devocional-lembrete',
          renotify: true
        });

        n.onclick = () => {
          window.focus();
          n.close();
        };
        return true;
      } catch (e) {
        console.warn('Falha ao exibir Notification API:', e);
      }
    }

    return false;
  }

  function sincronizarAgendamentoNativo() {
    const config = Armazenamento.obterConfigNotificacoes();
    if (!eAndroidNativo()) return;

    try {
      if (config.ativo) {
        const partes = (config.horario || '07:00').split(':');
        const hora = parseInt(partes[0], 10) || 7;
        const minuto = parseInt(partes[1], 10) || 0;
        window.AndroidBridge.scheduleDailyReminder(
          hora,
          minuto,
          config.titulo || 'Meu Devocional · Momento Diário',
          config.mensagem || 'Hora de fazer uma pausa para o seu devocional diário com Deus.'
        );
      } else {
        window.AndroidBridge.cancelDailyReminder();
      }
    } catch (e) {
      console.warn('Erro ao sincronizar agendamento nativo:', e);
    }
  }

  function checarDisparoWeb() {
    const config = Armazenamento.obterConfigNotificacoes();
    if (!config.ativo) return;

    const horarioAtual = obterHorarioAtualFormatado();
    const hojeStr = obterDataHojeFormatada();

    // Se já disparou hoje para este agendamento, não dispara de novo
    if (config.ultimoDisparoData === hojeStr) {
      return;
    }

    // Dispara se já passou do horário configurado hoje (comparação >=),
    // para não perder o minuto exato se o navegador atrasar o timer
    // ou se o app for aberto depois do horário.
    if (horarioAtual >= (config.horario || '07:00')) {
      exibirNotificacao(
        config.titulo || 'Meu Devocional · Momento Diário',
        config.mensagem || 'Hora de fazer uma pausa para o seu devocional diário com Deus.'
      );

      Armazenamento.salvarConfigNotificacoes({
        ultimoDisparoData: hojeStr
      });
    }
  }

  function iniciarLoopWeb() {
    clearInterval(timerVerificacao);
    checarDisparoWeb();
    timerVerificacao = setInterval(checarDisparoWeb, 30000); // Checa a cada 30 segundos
  }

  function inicializar() {
    sincronizarAgendamentoNativo();
    iniciarLoopWeb();
  }

  async function alternarAtivacao() {
    const config = Armazenamento.obterConfigNotificacoes();
    const novoStatus = !config.ativo;

    if (novoStatus) {
      const permissao = await solicitarPermissao();
      if (permissao === 'denied') {
        alert('As notificações estão bloqueadas no seu navegador ou dispositivo. Por favor, habilite as notificações nas permissões do site ou configurações do app.');
        return false;
      }
    }

    Armazenamento.salvarConfigNotificacoes({ ativo: novoStatus });
    sincronizarAgendamentoNativo();
    return novoStatus;
  }

  function salvarHorario(horario, mensagemCustomizada) {
    const dados = { horario };
    if (mensagemCustomizada !== undefined) {
      dados.mensagem = mensagemCustomizada;
    }
    const config = Armazenamento.salvarConfigNotificacoes(dados);
    sincronizarAgendamentoNativo();
    return config;
  }

  async function dispararTeste() {
    const status = obterStatusPermissao();
    if (status !== 'granted') {
      const res = await solicitarPermissao();
      if (res === 'denied') {
        alert('Permissão para notificações não foi autorizada.');
        return false;
      }
    }

    const config = Armazenamento.obterConfigNotificacoes();
    const titulo = '🔔 Lembrete de Teste · Meu Devocional';
    const corpo = `Tudo pronto! Seu lembrete diário está programado para às ${config.horario || '07:00'}.`;

    const sucesso = exibirNotificacao(titulo, corpo);
    return sucesso;
  }

  return {
    inicializar,
    eAndroidNativo,
    suportaWebNotification,
    obterStatusPermissao,
    solicitarPermissao,
    alternarAtivacao,
    salvarHorario,
    dispararTeste,
    exibirNotificacao,
    tocarSinoSuave
  };
})();
