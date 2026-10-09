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
  // INDICADOR VISUAL E CHECKBOXES (ESCRITURAS, REFLEXÃO, ORAÇÃO)
  // ==========================================
  function renderTrackerPartes(day) {
    const partes = Armazenamento.obterPartesDevocional(day.key);
    const concluidas = (partes.scripture ? 1 : 0) + (partes.reflection ? 1 : 0) + (partes.prayer ? 1 : 0);
    const todasConcluidas = concluidas === 3;
    const porcentagem = Math.round((concluidas / 3) * 100);

    return `
      <div class="devotional-tracker-card">
        <div class="tracker-header">
          <div>
            <p class="lb" style="color: var(--lit); font-weight: 700; font-size: 11px; letter-spacing: 0.05em; margin: 0;">
              PROGRESSO DO DEVOCIONAL
            </p>
            <h3 style="margin: 3px 0 0; font-size: 15px; font-weight: 600; color: var(--tx);">
              Partes de Hoje (${concluidas}/3)
            </h3>
          </div>
          <div class="tracker-badge ${todasConcluidas ? 'completed' : ''}">
            ${todasConcluidas ? '✓ Concluído hoje' : `${porcentagem}% Concluído`}
          </div>
        </div>

        <!-- Barra visual de progresso com 3 segmentos -->
        <div class="tracker-progress-bar" title="Progresso: ${concluidas} de 3 partes concluídas">
          <div class="tracker-progress-segment ${partes.scripture ? 'active' : ''}"></div>
          <div class="tracker-progress-segment ${partes.reflection ? 'active' : ''}"></div>
          <div class="tracker-progress-segment ${partes.prayer ? 'active' : ''}"></div>
        </div>

        <div class="tracker-items-list">
          <!-- 1. ESCRITURAS (SCRIPTURE) -->
          <div class="tracker-item ${partes.scripture ? 'checked' : ''}">
            <button class="tracker-checkbox" data-a="tog_parte" data-parte="scripture" aria-label="Marcar Escrituras como concluída" title="${partes.scripture ? 'Desmarcar Escrituras' : 'Marcar Escrituras como concluída'}">
              <span class="tracker-check-icon">${partes.scripture ? '✓' : ''}</span>
            </button>
            <div class="tracker-item-info" data-a="tog_parte" data-parte="scripture">
              <div class="tracker-item-title-row">
                <span class="tracker-icon">📖</span>
                <span class="tracker-title">1. Escrituras</span>
                <span class="tracker-tag">Leitura</span>
              </div>
              <p class="tracker-desc">Textos bíblicos do Lecionário Comum Revisado (${day.reads ? day.reads.length : 0} leituras)</p>
            </div>
            <button class="tracker-action-btn" data-a="read" data-r="0" title="Ler a primeira leitura bíblica">
              Ler →
            </button>
          </div>

          <!-- 2. REFLEXÃO (REFLECTION) -->
          <div class="tracker-item ${partes.reflection ? 'checked' : ''}">
            <button class="tracker-checkbox" data-a="tog_parte" data-parte="reflection" aria-label="Marcar Reflexão como concluída" title="${partes.reflection ? 'Desmarcar Reflexão' : 'Marcar Reflexão como concluída'}">
              <span class="tracker-check-icon">${partes.reflection ? '✓' : ''}</span>
            </button>
            <div class="tracker-item-info" data-a="tog_parte" data-parte="reflection">
              <div class="tracker-item-title-row">
                <span class="tracker-icon">✍️</span>
                <span class="tracker-title">2. Reflexão</span>
                <span class="tracker-tag">Meditação</span>
              </div>
              <p class="tracker-desc">Meditar na Palavra, exame do coração e anotações</p>
            </div>
            <button class="tracker-action-btn" data-a="iniciar_reflexao" title="Ir para a reflexão">
              Refletir →
            </button>
          </div>

          <!-- 3. ORAÇÃO (PRAYER) -->
          <div class="tracker-item ${partes.prayer ? 'checked' : ''}">
            <button class="tracker-checkbox" data-a="tog_parte" data-parte="prayer" aria-label="Marcar Oração como concluída" title="${partes.prayer ? 'Desmarcar Oração' : 'Marcar Oração como concluída'}">
              <span class="tracker-check-icon">${partes.prayer ? '✓' : ''}</span>
            </button>
            <div class="tracker-item-info" data-a="tog_parte" data-parte="prayer">
              <div class="tracker-item-title-row">
                <span class="tracker-icon">🙏</span>
                <span class="tracker-title">3. Oração</span>
                <span class="tracker-tag">Comunhão</span>
              </div>
              <p class="tracker-desc">Momento de oração, gratidão, entrega e silêncio</p>
            </div>
            <button class="tracker-action-btn" data-a="iniciar_oracao" title="Ir para a oração">
              Orar →
            </button>
          </div>
        </div>

        ${todasConcluidas ? `
          <div class="tracker-complete-banner">
            <span style="font-size: 20px;">🎉</span>
            <div>
              <strong style="display: block; font-size: 13.5px;">Devocional de hoje concluído!</strong>
              <span style="font-size: 12px; opacity: 0.9;">Você completou as Escrituras, a Reflexão e a Oração. Que a Palavra de Deus habite ricamente em você!</span>
            </div>
          </div>
        ` : ''}
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

        <!-- BOTÃO MODO LEITURA (FOCO TOTAL) -->
        <button class="btn-focus-mode" data-a="abrir_modo_leitura" title="Abrir Modo Leitura com foco total">
          <span class="btn-focus-icon">📖</span>
          <div class="btn-focus-texts">
            <span class="btn-focus-title">Modo Leitura · Foco Total</span>
            <span class="btn-focus-desc">Expanda todas as leituras, reflexão e oração do dia sem distrações</span>
          </div>
          <span class="btn-focus-arrow">→</span>
        </button>

        <!-- INDICADOR VISUAL E CHECKBOXES (ESCRITURAS, REFLEXÃO, ORAÇÃO) -->
        ${renderTrackerPartes(day)}

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
        <div class="top" style="display: flex; justify-content: space-between; align-items: center;">
          <button data-a="rback">← Voltar</button>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="focus-ctrl-btn" data-a="abrir_modo_leitura" title="Abrir todas as leituras no Modo Leitura">📖 Foco Total</button>
            <span>Leitura ${estado.r + 1} de ${day.reads.length}</span>
          </div>
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
          <p class="sub" style="margin: 0 0 14px;">${esc(m.n)} · ${esc(m.t)}</p>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            <span class="tracker-badge completed">📖 Escrituras ✓</span>
            <span class="tracker-badge completed">✍️ Reflexão ✓</span>
            <span class="tracker-badge completed">🙏 Oração ✓</span>
          </div>
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

  // ==========================================
  // MODO LEITURA (FOCO TOTAL)
  // ==========================================
  function focusReader(estado) {
    const day = estado.diaAtual;
    const prefs = estado.leituraPrefs || (typeof Armazenamento !== 'undefined' ? Armazenamento.obterPreferenciasLeitura() : { tamanho: 'md', tema: 'sepia', serif: true });
    const versao = estado.ver || 'NAA';
    const partes = typeof Armazenamento !== 'undefined' ? Armazenamento.obterPartesDevocional(day.key) : { scripture: false, reflection: false, prayer: false };
    const todasConcluidas = partes.scripture && partes.reflection && partes.prayer;

    // Passos do dia para reflexão e oração
    const passos = estado.passosAtuais || {};
    const meditacao = passos.meditacao || passos.meditar || {
      h: 'Meditação na Palavra',
      b: 'Reflita em silêncio sobre a mensagem que o Espírito Santo destacou para sua vida hoje.'
    };
    const exame = passos.exame || {
      h: 'Exame do Coração',
      q: 'Onde você mais precisa da graça e da direção de Deus no dia de hoje?'
    };
    const oracao = passos.oracao || passos.orar || {
      h: 'Oração e Comunhão',
      b: 'Fale com o Senhor com sinceridade de coração, agradecendo pelas misericórdias e entregando suas fraquezas.'
    };

    let h = `
      <div class="focus-top-bar">
        <button class="focus-back-btn" data-a="sair_modo_leitura" title="Sair do Modo Leitura e voltar">
          ← Voltar
        </button>

        <div class="focus-controls-group">
          <!-- TAMANHO DA FONTE -->
          <button class="focus-ctrl-btn" data-a="leitura_tam_menos" title="Diminuir tamanho da fonte" ${prefs.tamanho === 'sm' ? 'disabled style="opacity: 0.5;"' : ''}>A-</button>
          <button class="focus-ctrl-btn" data-a="leitura_tam_mais" title="Aumentar tamanho da fonte" ${prefs.tamanho === 'xl' ? 'disabled style="opacity: 0.5;"' : ''}>A+</button>

          <!-- FONTE SERIF / SANS -->
          <button class="focus-ctrl-btn ${prefs.serif ? 'active' : ''}" data-a="leitura_fonte_toggle" title="Alternar entre fonte com serifa e sem serifa">
            ${prefs.serif ? 'Serif' : 'Sans'}
          </button>

          <!-- TEMAS: CLARO, SÉPIA, ESCURO -->
          <button class="focus-ctrl-btn ${prefs.tema === 'light' ? 'active' : ''}" data-a="leitura_tema" data-tema="light" title="Tema Claro">☀️</button>
          <button class="focus-ctrl-btn ${prefs.tema === 'sepia' ? 'active' : ''}" data-a="leitura_tema" data-tema="sepia" title="Tema Sépia">📜</button>
          <button class="focus-ctrl-btn ${prefs.tema === 'dark' ? 'active' : ''}" data-a="leitura_tema" data-tema="dark" title="Tema Escuro">🌙</button>
        </div>
      </div>

      <div class="focus-container">
        <!-- CABEÇALHO DO DEVOCIONAL DO DIA -->
        <div class="focus-header-section">
          <span class="focus-season-tag">${esc(day.season || 'Tempo Comum')}</span>
          <h1 class="focus-main-title">${esc(day.titulo || 'Devocional Diário')}</h1>
          <p class="focus-day-date">${esc(day.label)} · Tradução: <strong>${esc(versao)}</strong></p>
        </div>

        <!-- VERSÍCULO CHAVE DO DIA -->
        <div class="focus-key-verse">
          <p class="focus-verse-quote">«${esc(day.verse ? day.verse.replace(/^«|»$/g, '').trim() : '')}»</p>
          <p class="focus-verse-ref">${esc(day.vref || '')}</p>
        </div>

        <!-- SEÇÃO: TODAS AS LEITURAS BÍBLICAS EXPANDIDAS DO RCL -->
        <div class="focus-section">
          <p class="focus-section-label">Lecionário Comum Revisado</p>
          <h2 class="focus-section-title">Leituras Bíblicas do Dia</h2>

          ${(day.reads || []).map((r, idx) => {
            const tipo = r.tipo || r[0] || `Leitura ${idx + 1}`;
            const ref = r.ref || r[1] || '';
            const resumo = r.resumo || '';
            const texto = r.texto || '';

            return `
              <div class="focus-reading-card" id="leitura-${idx}">
                <div class="focus-reading-badge-row">
                  <span class="focus-reading-type">${esc(tipo)}</span>
                  <span style="font-size: 12px; color: var(--tx3); font-weight: 500;">Passagem ${idx + 1} de ${day.reads.length}</span>
                </div>
                <h3 class="focus-reading-ref">${esc(ref)}</h3>
                ${resumo ? `<p class="focus-reading-summary">${esc(resumo)}</p>` : ''}
                
                ${texto ? `
                  <div class="focus-readable-text">${esc(texto)}</div>
                ` : `
                  <p class="focus-readable-text" style="font-style: italic; color: var(--tx2);">
                    Consulte a passagem bíblica completa no seu leitor preferido.
                  </p>
                `}
              </div>
            `;
          }).join('')}
        </div>

        <!-- SEÇÃO: MEDITAÇÃO E EXAME -->
        <div class="focus-section">
          <p class="focus-section-label">Meditação & Exame</p>
          <h2 class="focus-section-title">${esc(meditacao.h || 'Meditação na Palavra')}</h2>
          
          ${meditacao.b ? `
            <div class="focus-readable-text" style="margin-bottom: 16px;">
              ${esc(meditacao.b)}
            </div>
          ` : ''}

          <div class="focus-prompt-box">
            <h4 class="focus-prompt-title">${esc(exame.h || 'Autoexame e Aplicação')}</h4>
            <p class="focus-prompt-desc">${esc(exame.q || 'Como a mensagem das Escrituras se aplica ao seu dia hoje?')}</p>
          </div>
        </div>

        <!-- SEÇÃO: ORAÇÃO GUIADA E SILÊNCIO -->
        <div class="focus-section">
          <p class="focus-section-label">Oração & Comunhão</p>
          <h2 class="focus-section-title">${esc(oracao.h || 'Oração do Dia')}</h2>
          
          <div class="focus-readable-text">
            ${esc(oracao.b || 'Senhor Deus, guia nossos passos na Tua verdade e no Teu amor.')}
          </div>

          <div class="focus-prompt-box" style="margin-top: 18px; border-left: 3px solid var(--lit);">
            <p class="focus-prompt-desc" style="font-style: italic;">
              "Aquietai-vos e sabei que eu sou Deus." — Salmo 46:10. Reserve um momento de silêncio para ouvir e repousar na presença divina.
            </p>
          </div>
        </div>

        <!-- CONCLUSÃO E MARCAÇÃO DE DEVOCIONAL -->
        <div class="focus-completion-box">
          <button class="focus-complete-btn" data-a="concluir_leitura_foco">
            ${todasConcluidas ? '✓ Devocional de Hoje Concluído' : '✓ Concluir Leitura Devocional de Hoje'}
          </button>
          <div style="margin-top: 14px;">
            <button class="link" data-a="sair_modo_leitura" style="font-size: 14px;">
              ← Voltar para o painel principal
            </button>
          </div>
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
    focusReader,
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
        case 'focus_read':
          return focusReader(estado);
        default:
          return home(estado);
      }
    }
  };
})();
