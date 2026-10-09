/**
 * MEU DEVOCIONAL - TELAS
 * Renderização das telas do Lecionário Comum Revisado
 */

const Telas = (() => {

  function esc(t) {
    if (!t) return '';
    return String(t).replace(/[&<>"]/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '(': '&#40;', ')': '&#41;', '>': '&gt;', '"': '&quot;' }[c] || c;
    });
  }

  function head(day) {
    return `<p class="eyebrow"><i></i>${esc(day.season)}</p>`;
  }

  // ==========================================
  // STATUS E SINCRONIZAÇÃO EM NUVEM (FIREBASE)
  // ==========================================
  function bannerNuvem() {
    const usuario = typeof FirebaseService !== 'undefined' ? FirebaseService.obterUsuario() : null;
    if (usuario) {
      return `
        <div class="card" style="padding: 12px 16px; margin-bottom: 14px; background: color-mix(in srgb, var(--lit) 6%, var(--card)); border-left: 3px solid var(--lit);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="cloud-badge">✓ Nuvem Conectada</span>
              <p class="lb" style="margin: 4px 0 0; font-size: 13px; color: var(--tx);">${esc(usuario.displayName || usuario.email)}</p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="chip" data-a="sincronizar_nuvem" style="min-height: 32px; padding: 0 10px; font-size: 12px;" title="Sincronizar com Firestore">
                Sincronizar ☁️
              </button>
              <button class="link" data-a="logout_google" style="width: auto; min-height: 32px; margin: 0; padding: 0 6px; font-size: 12px; color: var(--tx3);">
                Sair
              </button>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div class="card" style="padding: 12px 16px; margin-bottom: 14px; border-left: 3px solid var(--bd);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p class="lb" style="margin: 0; font-size: 12px; color: var(--tx2);">Sincronização em Nuvem (Firebase)</p>
            <p class="sub" style="margin: 2px 0 0; font-size: 13px;">Salve suas reflexões na sua conta Google</p>
          </div>
          <button class="chip" data-a="login_google" style="min-height: 32px; padding: 0 12px; font-size: 12px; font-weight: 500; border-color: var(--lit); color: var(--lit);">
            Conectar Google
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // TELA INICIAL (HOJE)
  // ==========================================
  function home(estado) {
    const day = estado.diaAtual;
    const m = MODES[estado.mode] || MODES.padrao;
    const n = Armazenamento.obterDevocionaisConcluidos().length;
    const vDoDia = estado.versiculoDoDia;

    let h = bannerNuvem() + `
      <div class="card">
        ${head(day)}
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px;">
          <h1 style="margin: 0;">Meu Devocional</h1>
          ${typeof DIAS_RCL !== 'undefined' && DIAS_RCL.length > 1 ? `
            <button class="chip" data-a="togday" style="min-height: 32px; padding: 0 10px; font-size: 12px;">
              ${esc(day.label.split(',')[0])} ▾
            </button>
          ` : ''}
        </div>
        <p class="sub">${esc(day.label)}</p>

        <!-- SELETOR DE DIAS DO LECIONÁRIO SE EXPANDIDO -->
        ${estado.showDays ? `
          <div class="chips" style="margin-top: -6px; margin-bottom: 16px;">
            ${DIAS_RCL.map((d, idx) => `
              <button class="chip ${estado.diaIndex === idx ? 'on' : ''}" data-a="setday" data-k="${idx}">
                ${esc(d.label)}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- VERSÍCULO DO DIA EM DESTAQUE -->
        <div class="bar" style="border-left-width: 3.5px; margin: 18px 0 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <p class="lb" style="color: var(--lit); font-weight: 600; font-size: 11px; margin: 0; letter-spacing: 0.06em;">
              VERSÍCULO DO DIA
            </p>
            <div style="display: flex; align-items: center; gap: 6px;">
              ${vDoDia.tema ? `<span style="font-size: 11px; color: var(--tx3); text-transform: uppercase; font-weight: 500;">${esc(vDoDia.tema)}</span>` : ''}
              <button data-a="outro_versiculo" style="background: none; border: none; color: var(--tx2); cursor: pointer; font-size: 13px; padding: 0 4px;" title="Ver outro versículo da lista">↻</button>
            </div>
          </div>
          <p class="verse" style="margin-bottom: 6px;">${esc(vDoDia.texto)}</p>
          <p class="lb" style="font-size: 13px; font-weight: 600; color: var(--tx);">${esc(vDoDia.referencia)}</p>
        </div>

        <div class="hr"></div>

        <p class="lb" style="margin-bottom: 12px;">Leituras do Lecionário Comum Revisado</p>
    `;

    // LISTA DE LEITURAS DO RCL
    day.reads.forEach((r, j) => {
      const tipo = r.tipo || r[0];
      const ref = r.ref || r[1];
      h += `
        <button class="rb" data-a="read" data-r="${j}">
          <span>
            <span class="lb" style="display: block;">${esc(tipo)}</span>
            <span class="rf" style="display: block;">${esc(ref)}</span>
          </span>
          <span class="go">Ler</span>
        </button>
      `;
    });

    h += `
        <div style="height: 6px;"></div>
        <button class="btn" data-a="start">Começar · ${esc(m.n)} · ${esc(m.t)}</button>
        <button class="link" data-a="tog">${estado.showModes ? 'Fechar' : 'Alterar modo'}</button>
    `;

    if (estado.showModes) {
      h += `<div class="hr" style="margin-top: 8px;"></div>`;
      Object.keys(MODES).forEach((k) => {
        const x = MODES[k];
        h += `
          <button class="opt ${k === estado.mode ? 'on' : ''}" data-a="mode" data-k="${k}">
            <span>${esc(x.n)}</span>
            <small>${esc(x.t)}</small>
          </button>
        `;
      });
      h += `<p class="small">O modo escolhido fica salvo para os próximos dias.</p>`;
    }

    h += `
      </div>
      <p class="small" style="text-align: center;">
        ${n ? n + (n > 1 ? ' devocionais concluídos' : ' devocional concluído') : 'Seu primeiro devocional está a um toque.'}
      </p>
    `;

    return h;
  }

  // ==========================================
  // PASSO DO DEVOCIONAL (STEP)
  // ==========================================
  function step(estado) {
    const day = estado.diaAtual;
    const m = MODES[estado.mode] || MODES.padrao;
    const k = m.s[estado.i];
    const s = estado.passosAtuais[k] || { l: 'Passo', h: '', b: '' };
    const last = estado.i === m.s.length - 1;

    let h = `
      <div class="card">
        <div class="top">
          <button data-a="back">${estado.i ? '← Voltar' : '← Início'}</button>
          <span>${esc(m.n)} · ${esc(m.t)}</span>
        </div>

        <div class="pg">
          ${m.s.map((_, j) => `<span class="${j <= estado.i ? 'd' : ''}"></span>`).join('')}
        </div>

        <p class="eyebrow" style="margin: 0 0 26px;"><i></i>${esc(day.season)} · ${esc(day.label)}</p>
        <p class="lb">${esc(s.l)}</p>

        <div class="bar" style="margin-top: 8px;">
          <h2>${esc(s.h)}</h2>
        </div>
    `;

    if (s.b) {
      h += `<p class="body">${esc(s.b)}</p>`;
    }

    if (k === 'palavra' || k === 'ler') {
      const idxEvangelho = day.reads.findIndex((r) => (r.tipo || r[0] || '').toLowerCase().includes('evangelho'));
      const rIdx = idxEvangelho >= 0 ? idxEvangelho : day.reads.length - 1;
      h += `
        <div style="height: 14px;"></div>
        <button class="btn" style="border-color: var(--bd);" data-a="read" data-r="${rIdx}">
          Ler o Evangelho do dia
        </button>
      `;
    }

    if (s.q) {
      h += `
        <textarea id="ta" placeholder="Escreva em poucas linhas. Fica salvo no seu diário.">${esc(estado.ans)}</textarea>
      `;
    }

    if (s.timer) {
      h += `
        <div class="timer" id="tmr">2:00</div>
        <button class="link" data-a="timer" id="tb" style="margin: 0 0 6px;">
          Iniciar 2 minutos de silêncio
        </button>
      `;
    }

    h += `
        <div style="height: 22px;"></div>
        <button class="btn" data-a="next">${last ? 'Concluir devocional' : 'Continuar'}</button>
    `;

    if (estado.mode === 'rapido' && estado.i === 0) {
      h += `<button class="link" data-a="swap" data-k="padrao">Tenho mais tempo hoje</button>`;
    }
    if (estado.mode === 'padrao' && estado.i === 0) {
      h += `<button class="link" data-a="swap" data-k="rapido">Preciso de algo mais curto</button>`;
    }

    h += `</div>`;
    return h;
  }

  // ==========================================
  // LEITOR DAS LEITURAS (READER)
  // ==========================================
  function reader(estado) {
    const day = estado.diaAtual;
    const r = day.reads[estado.r] || day.reads[0];
    const tipo = r.tipo || r[0] || 'Leitura';
    const ref = r.ref || r[1] || '';
    const texto = r.texto || '';

    const q = encodeURIComponent(ref.replace(/–/g, '-').replace(/,/g, ','));
    const u = `https://www.biblegateway.com/passage/?search=${q}&version=${encodeURIComponent(estado.ver)}`;

    let h = `
      <div class="card">
        <div class="top">
          <button data-a="rback">← Voltar</button>
          <span>Leitura ${estado.r + 1} de ${day.reads.length}</span>
        </div>

        <p class="eyebrow" style="margin: 0 0 22px;"><i></i>${esc(day.season)} · ${esc(day.label)}</p>
        <p class="lb">${esc(tipo)}</p>

        <div class="bar" style="margin-top: 8px;">
          <h2>${esc(ref)}</h2>
        </div>

        ${r.resumo ? `<p class="sub" style="margin-bottom: 12px; font-style: italic;">${esc(r.resumo)}</p>` : ''}

        <!-- TEXTO DA PASSAGEM BÍBLICA EMBUTIDO -->
        ${texto ? `
          <div class="bible-text">${esc(texto)}</div>
          <div class="hr"></div>
        ` : ''}

        <p class="body" style="margin-top: 6px;">
          Você também pode consultar em outras traduções e no Bible Gateway.
        </p>

        <p class="lb" style="margin-top: 18px;">Tradução</p>
        <div class="chips">
          ${(typeof VERSOES_BIBLIA !== 'undefined' ? VERSOES_BIBLIA : []).map((v) => `
            <button class="chip ${v[0] === estado.ver ? 'on' : ''}" data-a="ver" data-k="${v[0]}">
              ${esc(v[1])}
            </button>
          `).join('')}
        </div>

        <a class="btn" href="${u}" target="_blank" rel="noopener">
          Abrir ${esc(ref)} no Bible Gateway ↗
        </a>

        <div class="hr"></div>

        <div style="display: flex; gap: 10px;">
          <button class="btn" style="border-color: var(--bd);" data-a="rprev" 
            ${estado.r ? '' : 'disabled style="opacity: .4;"'}>Anterior</button>
          <button class="btn" style="border-color: var(--bd);" data-a="rnext" 
            ${estado.r < day.reads.length - 1 ? '' : 'disabled style="opacity: .4;"'}>Seguinte</button>
        </div>
      </div>
    `;

    return h;
  }

  // ==========================================
  // CONCLUSÃO (DONE)
  // ==========================================
  function done(estado) {
    const m = MODES[estado.mode] || MODES.padrao;

    let h = `
      <div class="card">
        <div style="text-align: center; margin: 8px 0 24px;">
          <div class="check">✓</div>
          <h1 style="margin: 0 0 4px;">Devocional concluído</h1>
          <p class="sub" style="margin: 0;">${esc(m.n)} · ${esc(m.t)}</p>
        </div>

        <p class="lb" style="margin-bottom: 12px;">O que você fez hoje</p>
    `;

    m.s.forEach((k) => {
      const s = estado.passosAtuais[k] || { l: 'Passo', h: '' };
      h += `
        <div class="bar">
          <p class="lb">${esc(s.l)}</p>
          <p class="rf">${esc(s.h)}</p>
          ${s.q && estado.ans.trim() ? '<p class="lb" style="margin-top: 2px;">Salvo no seu diário</p>' : ''}
        </div>
      `;
    });

    h += `
        <div style="height: 10px;"></div>
        <button class="btn" data-a="diary">Ver no diário</button>
        <button class="link" data-a="home">Voltar ao início</button>
      </div>
    `;

    return h;
  }

  // ==========================================
  // DIÁRIO ESPIRITUAL (DIARY)
  // ==========================================
  function diary(estado) {
    const day = estado.diaAtual;
    const reflexoes = Armazenamento.obterReflexoes();

    let h = bannerNuvem() + `
      <div class="card">
        ${head(day)}
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px;">
          <h1 style="margin: 0;">Diário</h1>
          ${reflexoes.length ? `
            <button class="chip" data-a="exportardiario" style="min-height: 32px; padding: 0 10px; font-size: 12px;" title="Exportar todas as reflexões em arquivo .txt">
              Exportar (.txt)
            </button>
          ` : ''}
        </div>
        <p class="sub" style="margin-bottom: 12px;">Suas reflexões pessoais, orações e respostas do Exame.</p>

        ${estado.mensagemExportacao ? `
          <div class="bar" style="border-left-color: var(--lit); margin: 6px 0 14px; background: color-mix(in srgb, var(--lit) 8%, transparent); padding: 8px 12px; border-radius: 0 6px 6px 0;">
            <p class="rf" style="font-size: 14px; color: var(--tx);">${esc(estado.mensagemExportacao)}</p>
          </div>
        ` : ''}

        <!-- FORMULÁRIO DE NOVA REFLEXÃO PESSOAL -->
        <div class="bar" style="margin-top: 10px;">
          <p class="rf">Escrever Nova Reflexão</p>
          <p class="lb">Registre o que Deus falou ao seu coração hoje.</p>
        </div>

        <textarea id="ta-nova-reflexao" placeholder="Escreva aqui sua reflexão pessoal, oração ou gratidão...">${esc(estado.rascunhoReflexao || '')}</textarea>

        <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
          <button class="btn" style="width: auto; padding: 0 20px; min-height: 42px;" data-a="salvarreflexao">
            Salvar no Diário
          </button>
        </div>
      </div>

      <!-- LISTAGEM DAS REFLEXÕES SALVAS -->
    `;

    if (!reflexoes.length) {
      h += `
        <div class="card">
          <div class="bar">
            <p class="rf">Nenhuma reflexão registrada ainda</p>
            <p class="lb">Escreva acima ou conclua um devocional para que suas anotações fiquem salvas aqui.</p>
          </div>
        </div>
      `;
    } else {
      reflexoes.forEach((e) => {
        const id = e.id || '';
        const dataExibicao = e.hora ? `${e.data} às ${e.hora}` : e.data;
        const tituloExibicao = e.titulo || e.pergunta || e.q || 'Reflexão Pessoal';
        const textoExibicao = e.texto || e.text || '';

        h += `
          <div class="card" id="card-${id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <p class="lb" style="margin-bottom: 2px;">${esc(dataExibicao)} · ${esc(e.modo || e.mode || 'Devocional')}</p>
                <p class="rf" style="margin: 0;">${esc(tituloExibicao)}</p>
              </div>
              ${id ? `
                <button class="link" data-a="delreflexao" data-id="${esc(id)}" 
                  style="width: auto; min-height: 28px; margin: 0; padding: 0 4px; font-size: 12px; color: var(--tx3);"
                  title="Excluir esta reflexão">
                  Excluir
                </button>
              ` : ''}
            </div>

            <div class="body" style="margin-top: 10px; white-space: pre-wrap; font-size: 15px;">${esc(textoExibicao)}</div>
          </div>
        `;
      });
    }

    return h;
  }

  // ==========================================
  // CONSELHEIRO BÍBLICO (CHAT GEMINI)
  // ==========================================
  function chat(estado) {
    const day = estado.diaAtual;
    const mensagens = estado.chatMensagens || [];
    const modeloAtual = estado.chatModelo || 'geral';
    const carregando = !!estado.chatCarregando;

    let h = `
      <div class="card">
        ${head(day)}
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px;">
          <h1 style="margin: 0;">Conselheiro</h1>
          <button class="chip" data-a="limpar_chat" style="min-height: 32px; padding: 0 10px; font-size: 12px;" title="Reiniciar conversa">
            Novo Diálogo
          </button>
        </div>
        <p class="sub" style="margin-bottom: 14px;">
          Assistente teológico protestante guiado pelas Escrituras e pelo Lecionário Comum Revisado.
        </p>

        <!-- SELETOR DE MODELOS GEMINI -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <p class="lb" style="margin: 0; font-size: 12px;">Modelo de IA</p>
          <div class="chips" style="margin: 0;">
            <button class="chip ${modeloAtual === 'geral' ? 'on' : ''}" data-a="set_chat_modelo" data-k="geral" style="min-height: 28px; padding: 0 8px; font-size: 11px;">
              Flash 3.5
            </button>
            <button class="chip ${modeloAtual === 'complexo' ? 'on' : ''}" data-a="set_chat_modelo" data-k="complexo" style="min-height: 28px; padding: 0 8px; font-size: 11px;">
              Pro 3.1
            </button>
            <button class="chip ${modeloAtual === 'rapido' ? 'on' : ''}" data-a="set_chat_modelo" data-k="rapido" style="min-height: 28px; padding: 0 8px; font-size: 11px;">
              Lite 3.1
            </button>
          </div>
        </div>

        <!-- MENSAGENS DO CHAT -->
        <div class="chat-container" id="chat-mensagens-box">
    `;

    mensagens.forEach((msg) => {
      const isUser = msg.role === 'user';
      h += `
        <div class="chat-bubble ${isUser ? 'user' : 'model'}">
          ${esc(msg.content)}
        </div>
      `;
    });

    if (carregando) {
      h += `
        <div class="chat-bubble model">
          <div class="chat-typing">
            <span>Consultando as Escrituras…</span>
          </div>
        </div>
      `;
    }

    h += `
        </div>

        <!-- SUGESTÕES RÁPIDAS -->
        <p class="lb" style="font-size: 12px; margin-bottom: 6px;">Sugestões de reflexão:</p>
        <div class="chat-quick">
          <button class="chat-quick-btn" data-a="sugerir_chat" data-t="Como posso aplicar as leituras de hoje (${esc(day.reads[0]?.ref || 'RCL')}) na minha vida diária?">
            Aplicação do dia
          </button>
          <button class="chat-quick-btn" data-a="sugerir_chat" data-t="O que o princípio de Sola Gratia e Sola Fide nos ensina sobre oração?">
            Graça e Fé
          </button>
          <button class="chat-quick-btn" data-a="sugerir_chat" data-t="Poderia me sugerir uma oração bíblica para o momento de hoje?">
            Oração guiada
          </button>
        </div>

        <!-- CAMPO DE ENTRADA DO CHAT -->
        <div class="chat-input-row">
          <textarea id="ta-chat-msg" placeholder="Pergunte ao Conselheiro Bíblico..." ${carregando ? 'disabled' : ''}>${esc(estado.rascunhoChat || '')}</textarea>
          <button class="btn" data-a="enviar_chat" style="width: auto; min-height: 48px; padding: 0 18px;" ${carregando ? 'disabled style="opacity: 0.5;"' : ''}>
            Enviar
          </button>
        </div>
      </div>
    `;

    return h;
  }

  return {
    home,
    step,
    reader,
    done,
    diary,
    chat,
    render(estado) {
      switch (estado.screen) {
        case 'home':
          return home(estado);
        case 'step':
          return step(estado);
        case 'done':
          return done(estado);
        case 'read':
          return reader(estado);
        case 'diary':
          return diary(estado);
        case 'chat':
          return chat(estado);
        default:
          return home(estado);
      }
    }
  };
})();
