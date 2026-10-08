/**
 * MEU DEVOCIONAL - TELAS
 * Renderização das telas da aplicação usando o design system do app.css
 */

const Telas = (() => {

  // Helper para escapar HTML prevenindo XSS
  function escapeHtml(texto) {
    if (!texto) return '';
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ========================================================
  // TELA 1: HOJE (DEVOCIONAL DIÁRIO)
  // ========================================================
  function renderizarHoje(estado) {
    const dev = estado.devocionalAtual;
    if (!dev) {
      return `<div class="page"><div class="card"><p class="body">Nenhum devocional disponível no momento.</p></div></div>`;
    }

    const concluido = Armazenamento.foiConcluidoHoje(dev.id);
    const sequencia = Armazenamento.calcularSequenciaDias();
    const percentualProgresso = concluido ? 100 : 35;

    // Data de hoje formatada
    const agora = new Date();
    const opcoesData = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoesData);
    const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    return `
      <div class="page" id="tela-hoje">
        <!-- CABEÇALHO SUPERIOR -->
        <div class="top">
          <div>
            <div class="eyebrow">${escapeHtml(dev.tempoLiturgico)} • ${escapeHtml(dev.semanaLiturgica || 'Tempo Comum')}</div>
            <div class="sub">${escapeHtml(dataCapitalizada)}</div>
          </div>
          <button class="chip ${concluido ? 'active' : ''}" id="btn-toggle-devocionais" title="Alternar leitura diária">
            ${escapeHtml(dev.data)} ▾
          </button>
        </div>

        <!-- BARRA DE PROGRESSO -->
        <div class="pg" title="${percentualProgresso}% concluído">
          <div style="width: ${percentualProgresso}%"></div>
        </div>

        <!-- TÍTULO PRINCIPAL -->
        <h1>${escapeHtml(dev.titulo)}</h1>
        <p class="sub">${escapeHtml(dev.subtitulo)}</p>

        <!-- VERSÍCULO DESTAQUE -->
        <div class="verse">
          ${escapeHtml(dev.versiculoDestaque.texto)}
          <div class="sub" style="margin-top: 8px; font-weight: 700;">— ${escapeHtml(dev.versiculoDestaque.referencia)}</div>
        </div>

        <!-- BOTÕES RÁPIDOS DE LEITURA -->
        <div class="chips">
          <button class="chip active" onclick="Navegacao.irPara('leituras')">📖 Leituras Bíblicas</button>
          <button class="chip" onclick="Navegacao.irPara('oracao')">🕊️ Silêncio & Oração</button>
          <button class="chip" onclick="Navegacao.irPara('exame')">✍️ Exame da Noite</button>
        </div>

        <!-- CARTÃO DA REFLEXÃO PASTORAL -->
        <div class="card">
          <div class="eyebrow">REFLEXÃO ESPIRITUAL</div>
          <h2>Meditação da Palavra</h2>
          <div class="body" style="white-space: pre-line;">${escapeHtml(dev.reflexao.texto)}</div>

          <div class="bar">
            <strong>Para o seu coração:</strong><br />
            <em>${escapeHtml(dev.reflexao.perguntaReflexao)}</em>
          </div>

          <div class="hr"></div>

          <div class="eyebrow">APLICAÇÃO PRÁTICA</div>
          <p class="body" style="margin-bottom: 0;">${escapeHtml(dev.aplicacaoPratica)}</p>
        </div>

        <!-- CARTÃO DA ORAÇÃO DO DIA -->
        <div class="card">
          <div class="eyebrow">ORAÇÃO DO DIA</div>
          <h2>Oração Guiada</h2>
          <div class="body" style="font-style: italic; white-space: pre-line;">${escapeHtml(dev.oracaoDoDia)}</div>
        </div>

        <!-- AÇÃO DE CONCLUSÃO & SEQUÊNCIA -->
        <div class="card" style="text-align: center;">
          <div class="eyebrow">DISCIPLINA ESPIRITUAL</div>
          <h2>${concluido ? '✓ Devocional de Hoje Concluído!' : 'Finalizou sua reflexão?'}</h2>
          <p class="sub">
            ${concluido 
              ? 'Parabéns pela fidelidade à Palavra de Deus hoje.' 
              : 'Marque como concluído para manter o seu ritmo de oração.'}
          </p>

          <button class="btn" id="btn-concluir-devocional" style="${concluido ? 'border-color: var(--lit); color: var(--lit);' : ''}">
            ${concluido ? '✓ Realizado com Sucesso' : 'Marcar Devocional como Concluído'}
          </button>

          <div class="hr"></div>

          <div style="display: flex; justify-content: space-around; align-items: center;">
            <div>
              <div style="font-size: 24px; font-weight: 700; color: var(--lit);">🔥 ${sequencia}</div>
              <div class="small">Dias seguidos</div>
            </div>
            <div>
              <div style="font-size: 24px; font-weight: 700; color: var(--lit);">📖 ${Armazenamento.obterConclusoes().length}</div>
              <div class="small">Devocionais feitos</div>
            </div>
          </div>
        </div>

        <!-- REGISTRO RÁPIDO NO CADERNO -->
        <div class="card">
          <div class="eyebrow">SEU DIÁRIO ESPIRITUAL</div>
          <h2>Anotar Oração ou Reflexão</h2>
          <p class="sub">Guarde o que Deus falou com você através deste devocional.</p>
          <textarea id="texto-anotacao-rapida" placeholder="Escreva aqui sua oração, gratidão ou reflexão pessoal..."></textarea>
          <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
            <button class="btn" style="width: auto; padding: 10px 20px;" id="btn-salvar-anotacao-rapida">Salvar no Diário</button>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================
  // TELA 2: LEITURAS BÍBLICAS
  // ========================================================
  function renderizarLeituras(estado) {
    const dev = estado.devocionalAtual;
    const leituraAtiva = estado.leituraAtiva || 'evangelho';

    let itemLeitura = dev.evangelho;
    if (leituraAtiva === 'primeiraLeitura') itemLeitura = dev.primeiraLeitura;
    if (leituraAtiva === 'salmo') itemLeitura = dev.salmo;

    return `
      <div class="page" id="tela-leituras">
        <div class="top">
          <div>
            <div class="eyebrow">LITURGIA DA PALAVRA</div>
            <h1>Leituras Bíblicas</h1>
          </div>
        </div>

        <p class="sub">Alimente seu espírito com as leituras da liturgia do dia.</p>

        <!-- SELETOR DE LEITURA -->
        <div class="chips">
          <button class="chip ${leituraAtiva === 'evangelho' ? 'active' : ''}" onclick="Estado.atualizar({ leituraAtiva: 'evangelho' })">
            Evangelho
          </button>
          <button class="chip ${leituraAtiva === 'primeiraLeitura' ? 'active' : ''}" onclick="Estado.atualizar({ leituraAtiva: 'primeiraLeitura' })">
            Primeira Leitura
          </button>
          <button class="chip ${leituraAtiva === 'salmo' ? 'active' : ''}" onclick="Estado.atualizar({ leituraAtiva: 'salmo' })">
            Salmo Responsorial
          </button>
        </div>

        <!-- CARTÃO DO TEXTO BÍBLICO -->
        <div class="card">
          <div class="lb">${escapeHtml(itemLeitura.label)}</div>
          <div class="rf">${escapeHtml(itemLeitura.ref)}</div>

          ${itemLeitura.refrao ? `
            <div class="bar" style="font-weight: 700; font-size: 16px;">
              ${escapeHtml(itemLeitura.refrao)}
            </div>
          ` : ''}

          <div class="bible-text">${escapeHtml(itemLeitura.texto)}</div>
        </div>

        <!-- RECURSO LITÚRGICO -->
        <div class="rb">
          <div class="eyebrow">ORIENTAÇÃO DE LEITURA ORANTE</div>
          <p class="body" style="margin-bottom: 0;">
            <strong>Lectio Divina:</strong> Leia atentamente (Lectio), medite o que o texto diz a você (Meditatio), converse com Deus (Oratio) e contemple a Sua vontade (Contemplatio).
          </p>
        </div>

        <div style="margin-top: 20px;">
          <button class="btn" onclick="Navegacao.irPara('oracao')">Ir para Momento de Silêncio e Oração →</button>
        </div>
      </div>
    `;
  }

  // ========================================================
  // TELA 3: ORAÇÃO & SILÊNCIO (TIMER + ORAÇÕES TRADICIONAIS)
  // ========================================================
  function renderizarOracao(estado) {
    const timer = estado.timer;
    const minutos = Math.floor(timer.segundosRestantes / 60);
    const segundos = timer.segundosRestantes % 60;
    const tempoFormatado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    const filtro = estado.filtroOracoes || 'todas';

    // Lista filtrada de orações
    const oracoesFiltradas = (typeof ORACOES !== 'undefined' ? ORACOES : []).filter((o) => {
      if (filtro === 'todas') return true;
      return o.categoria === filtro;
    });

    return `
      <div class="page" id="tela-oracao">
        <div class="top">
          <div>
            <div class="eyebrow">CONTEMPLAÇÃO & PRECE</div>
            <h1>Oração & Silêncio</h1>
          </div>
        </div>

        <!-- SEÇÃO DO TIMER DE MEDITAÇÃO -->
        <div class="card">
          <div class="eyebrow">MOMENTO DE SILÊNCIO</div>
          <h2>Pausa Sagrada</h2>
          <p class="sub">Desacelere os pensamentos e coloque-se na doce presença do Criador.</p>

          <!-- PRESETS DE TEMPO -->
          <div class="chips">
            ${(typeof TIMER_PRESETS !== 'undefined' ? TIMER_PRESETS : []).map((p) => `
              <button class="chip ${timer.minutosSelecionados === p.minutos ? 'active' : ''}" 
                onclick="App.selecionarPresetTimer(${p.minutos})">
                ${p.label}
              </button>
            `).join('')}
          </div>

          <!-- VISOR DO TIMER -->
          <div class="timer" id="visor-timer">
            ${tempoFormatado}
          </div>

          <div style="display: flex; gap: 10px;">
            ${timer.rodando ? `
              <button class="btn" style="border-color: var(--lit);" onclick="App.pausarTimer()">Pausar</button>
            ` : `
              <button class="btn" style="background: var(--lit); color: #FFF; border-color: var(--lit);" onclick="App.iniciarTimer()">
                ${timer.segundosRestantes < timer.segundosTotais ? 'Continuar' : 'Iniciar Silêncio'}
              </button>
            `}
            <button class="btn" style="width: auto; padding: 13px 18px;" onclick="App.reiniciarTimer()" title="Reiniciar">↻</button>
          </div>

          <div class="small" style="text-align: center; margin-top: 12px;">
            «Aquietai-vos e sabei que Eu sou Deus.» — Salmo 46:10
          </div>
        </div>

        <div class="hr"></div>

        <!-- SEÇÃO DE ORAÇÕES DA TRADIÇÃO -->
        <div class="top">
          <div>
            <div class="eyebrow">TRADIÇÃO CRISTÃ</div>
            <h2>Orações Vocais</h2>
          </div>
        </div>

        <!-- FILTROS DE CATEGORIA -->
        <div class="chips">
          <button class="chip ${filtro === 'todas' ? 'active' : ''}" onclick="Estado.atualizar({ filtroOracoes: 'todas' })">Todas</button>
          <button class="chip ${filtro === 'manhã' ? 'active' : ''}" onclick="Estado.atualizar({ filtroOracoes: 'manhã' })">Manhã</button>
          <button class="chip ${filtro === 'noite' ? 'active' : ''}" onclick="Estado.atualizar({ filtroOracoes: 'noite' })">Noite</button>
          <button class="chip ${filtro === 'classicas' ? 'active' : ''}" onclick="Estado.atualizar({ filtroOracoes: 'classicas' })">Clássicas</button>
        </div>

        <!-- LISTA DE ORAÇÕES -->
        ${oracoesFiltradas.map((oracao) => `
          <div class="card opt" style="cursor: default;" id="oracao-${oracao.id}">
            <div class="lb">${escapeHtml(oracao.categoria.toUpperCase())} • ${escapeHtml(oracao.autor)}</div>
            <div class="rf">${escapeHtml(oracao.titulo)}</div>
            <div class="body" style="white-space: pre-line; line-height: 1.65; margin-top: 10px;">
              ${escapeHtml(oracao.texto)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ========================================================
  // TELA 4: EXAME DE CONSCIÊNCIA
  // ========================================================
  function renderizarExame(estado) {
    const exameHoje = Armazenamento.obterExameHoje();
    const passos = typeof EXAME_PASSOS !== 'undefined' ? EXAME_PASSOS : [];

    return `
      <div class="page" id="tela-exame">
        <div class="top">
          <div>
            <div class="eyebrow">REVISÃO DE VIDA</div>
            <h1>Exame de Consciência</h1>
          </div>
          ${exameHoje.concluido ? '<span class="chip active">✓ Realizado Hoje</span>' : ''}
        </div>

        <p class="sub">
          Os 5 passos da oração de discernimento diário para reconhecer onde Deus esteve presente e onde precisamos de renovação.
        </p>

        <!-- PROGRESSO DOS PASSOS -->
        ${passos.map((passo) => `
          <div class="card">
            <div class="lb">${escapeHtml(passo.etapa)}</div>
            <h2>${escapeHtml(passo.titulo)}</h2>
            <p class="body" style="margin-bottom: 14px;">${escapeHtml(passo.instrucao)}</p>

            ${passo.perguntas.map((p) => {
              const checado = !!(exameHoje.respostas && exameHoje.respostas[p.id]);
              return `
                <label class="check" for="chk-${p.id}">
                  <input type="checkbox" id="chk-${p.id}" ${checado ? 'checked' : ''} 
                    onchange="App.alternarPerguntaExame('${p.id}', this.checked)" />
                  <span>${escapeHtml(p.texto)}</span>
                </label>
              `;
            }).join('')}
          </div>
        `).join('')}

        <!-- ATO DE CONTRIÇÃO -->
        <div class="rb">
          <div class="lb">ORAÇÃO PENITENCIAL</div>
          <div class="rf">Ato de Contrição</div>
          <p class="body" style="margin-bottom: 0;">
            «Meu Deus, eu me arrependo de todo o coração de Vos ter ofendido, porque sois tão bom e amável. Prometo com a Vossa graça não mais pecar e evitar as ocasiões de pecado. Senhor, tende compaixão de mim! Amém.»
          </p>
        </div>

        <!-- PROPÓSITO PARA AMANHÃ -->
        <div class="card">
          <div class="eyebrow">PROPÓSITO DE EMENDA</div>
          <h2>Meu compromisso para amanhã</h2>
          <textarea id="texto-proposito-exame" placeholder="Qual atitude ou virtude você quer exercitar com a graça de Deus amanhã?">${escapeHtml(exameHoje.proposito || '')}</textarea>
          <div style="margin-top: 14px;">
            <button class="btn" style="background: var(--lit); color: #FFF; border-color: var(--lit);" onclick="App.finalizarExame()">
              ${exameHoje.concluido ? 'Atualizar Exame do Dia' : 'Concluir Exame de Hoje'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================
  // TELA 5: CADERNO ESPIRITUAL (DIÁRIO & ANOTAÇÕES)
  // ========================================================
  function renderizarDiario(estado) {
    const filtro = estado.filtroDiario || 'todos';
    const todasNotas = Armazenamento.obterAnotacoes();
    const notasFiltradas = todasNotas.filter((n) => {
      if (filtro === 'todos') return true;
      return n.tag === filtro;
    });

    return `
      <div class="page" id="tela-diario">
        <div class="top">
          <div>
            <div class="eyebrow">REGISTRO PESSOAL</div>
            <h1>Caderno Espiritual</h1>
          </div>
        </div>

        <p class="sub">Guarde suas inspirações, orações, agradecimentos e promessas de Deus.</p>

        <!-- FORMULÁRIO DE NOVA ANOTAÇÃO -->
        <div class="card">
          <div class="eyebrow">NOVO REGISTRO</div>
          <h2>Escrever no Diário</h2>

          <input type="text" id="input-diario-titulo" class="opt" style="cursor: text; font-size: 16px; font-weight: 700; margin-bottom: 12px;" 
            placeholder="Título da anotação (ex: Palavra que tocou meu coração)" />

          <!-- SELEÇÃO DE TAG -->
          <div class="lb">CATEGORIA:</div>
          <div class="chips" id="chips-tags-diario">
            ${['Reflexão', 'Oração', 'Gratidão', 'Propósito'].map((tag) => `
              <button type="button" class="chip ${tag === 'Reflexão' ? 'active' : ''}" data-tag="${tag}" onclick="App.selecionarTagFormulario('${tag}')">
                ${tag}
              </button>
            `).join('')}
          </div>

          <textarea id="textarea-diario-conteudo" placeholder="Escreva com calma sua oração, insight ou reflexão espiritual..."></textarea>

          <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
            <button class="btn" style="width: auto; padding: 12px 24px;" onclick="App.salvarNovaNotaDiario()">
              Salvar Anotação
            </button>
          </div>
        </div>

        <div class="hr"></div>

        <!-- FILTROS DAS ANOTAÇÕES SALVAS -->
        <div class="top">
          <div>
            <div class="eyebrow">MEMÓRIA ESPIRITUAL</div>
            <h2>Minhas Anotações (${notasFiltradas.length})</h2>
          </div>
        </div>

        <div class="chips">
          <button class="chip ${filtro === 'todos' ? 'active' : ''}" onclick="Estado.atualizar({ filtroDiario: 'todos' })">Todas</button>
          <button class="chip ${filtro === 'Reflexão' ? 'active' : ''}" onclick="Estado.atualizar({ filtroDiario: 'Reflexão' })">Reflexões</button>
          <button class="chip ${filtro === 'Oração' ? 'active' : ''}" onclick="Estado.atualizar({ filtroDiario: 'Oração' })">Orações</button>
          <button class="chip ${filtro === 'Gratidão' ? 'active' : ''}" onclick="Estado.atualizar({ filtroDiario: 'Gratidão' })">Gratidão</button>
          <button class="chip ${filtro === 'Propósito' ? 'active' : ''}" onclick="Estado.atualizar({ filtroDiario: 'Propósito' })">Propósito</button>
        </div>

        <!-- LISTAGEM DE NOTAS -->
        ${notasFiltradas.length === 0 ? `
          <div class="card" style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 32px; margin-bottom: 10px;">✍️</div>
            <div class="rf">Nenhum registro encontrado</div>
            <p class="sub">Suas anotações espirituais salvas aparecerão aqui com segurança no seu dispositivo.</p>
          </div>
        ` : notasFiltradas.map((nota) => `
          <div class="card" id="nota-${nota.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <span class="chip active" style="font-size: 11px; padding: 3px 8px;">${escapeHtml(nota.tag)}</span>
              <div class="small">${escapeHtml(nota.data)} às ${escapeHtml(nota.hora || '')}</div>
            </div>

            <h2>${escapeHtml(nota.titulo)}</h2>
            <div class="body" style="white-space: pre-line; margin-top: 10px;">${escapeHtml(nota.texto)}</div>

            <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
              <button class="link" style="color: #b83a3a; font-size: 13px;" onclick="App.removerNotaDiario('${nota.id}')">
                Excluir anotação
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return {
    renderizar(estado) {
      switch (estado.abaAtiva) {
        case 'hoje':
          return renderizarHoje(estado);
        case 'leituras':
          return renderizarLeituras(estado);
        case 'oracao':
          return renderizarOracao(estado);
        case 'exame':
          return renderizarExame(estado);
        case 'diario':
          return renderizarDiario(estado);
        default:
          return renderizarHoje(estado);
      }
    }
  };
})();
