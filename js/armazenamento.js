/**
 * MEU DEVOCIONAL - ARMAZENAMENTO
 * Mecanismo de persistência local para reflexões pessoais, preferências e histórico
 */

const Armazenamento = (() => {
  const CHAVE_REFLEXOES = 'md_reflexoes';
  const CHAVE_DIARIO_LEGADO = 'md_diary';
  const CHAVE_DIAS = 'md_days';
  const CHAVE_MODO = 'md_mode';
  const CHAVE_VERSAO = 'md_ver';
  const CHAVE_PREF_LEITURA = 'md_pref_leitura';

  // Fallback em memória caso o localStorage esteja desabilitado ou em sandbox
  const memoria = {};

  function storageDisponivel() {
    try {
      const teste = '__storage_teste__';
      window.localStorage.setItem(teste, teste);
      window.localStorage.removeItem(teste);
      return true;
    } catch (e) {
      return false;
    }
  }

  const temLocalStorage = typeof window !== 'undefined' && storageDisponivel();

  function obter(chave, padrao) {
    if (memoria[chave] !== undefined) {
      return memoria[chave];
    }
    if (!temLocalStorage) {
      return padrao;
    }
    try {
      const item = window.localStorage.getItem(chave);
      if (item === null || item === undefined) return padrao;
      const parsed = JSON.parse(item);
      memoria[chave] = parsed;
      return parsed;
    } catch (e) {
      console.warn(`Erro ao ler ${chave} do storage:`, e);
      return padrao;
    }
  }

  function salvar(chave, valor) {
    memoria[chave] = valor;
    if (!temLocalStorage) return;
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      console.warn(`Erro ao salvar ${chave} no storage (armazenando em memória):`, e);
    }
  }

  function formatarDataHoraAtual() {
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const horaFormatada = agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return {
      data: dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1),
      hora: horaFormatada
    };
  }

  return {
    obter,
    salvar,

    // ==========================================
    // PERSISTÊNCIA DE REFLEXÕES DO DIÁRIO
    // ==========================================

    /**
     * Retorna todas as reflexões pessoais salvas, ordenadas das mais recentes para as mais antigas.
     * Unifica com entradas legadas caso existam.
     */
    obterReflexoes() {
      let reflexoes = obter(CHAVE_REFLEXOES, []);

      // Migração e unificação de entradas legadas de md_diary
      const legadas = obter(CHAVE_DIARIO_LEGADO, []);
      if (Array.isArray(legadas) && legadas.length > 0) {
        let houveMigracao = false;
        legadas.forEach((l, idx) => {
          const jaExiste = reflexoes.some((r) => r.texto === l.text && r.data === l.date);
          if (!jaExiste && l.text && l.text.trim()) {
            reflexoes.push({
              id: 'migrado_' + idx + '_' + (l.timestamp || Date.now()),
              texto: l.text.trim(),
              titulo: l.q || 'Reflexão Pessoal',
              pergunta: l.q || '',
              modo: l.mode || 'Devocional',
              data: l.date || 'Data anterior',
              hora: '',
              timestamp: l.timestamp || Date.now() - (legadas.length - idx) * 60000
            });
            houveMigracao = true;
          }
        });

        if (houveMigracao) {
          salvar(CHAVE_REFLEXOES, reflexoes);
        }
        // Migração feita uma única vez: remove o formato legado para evitar
        // duplicatas e para que reflexões excluídas não "voltem".
        try { localStorage.removeItem(CHAVE_DIARIO_LEGADO); } catch (e) {}
      }

      // Ordena por data decrescente (mais recentes no topo)
      return reflexoes.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    },

    /**
     * Salva uma reflexão pessoal escrita pelo usuário.
     * @param {Object} dados { id, texto, titulo, pergunta, modo, data, referencia }
     * @returns {Object|null} A reflexão salva ou null se texto estiver vazio.
     */
    salvarReflexao(dados) {
      if (!dados || typeof dados.texto !== 'string') return null;

      const textoLimpo = dados.texto.trim();
      if (!textoLimpo) return null;

      const reflexoes = this.obterReflexoes();
      const dataHora = formatarDataHoraAtual();

      const novaReflexao = {
        id: dados.id || 'ref_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        texto: textoLimpo,
        titulo: (dados.titulo || dados.pergunta || 'Reflexão Pessoal').trim(),
        pergunta: dados.pergunta || '',
        modo: dados.modo || 'Padrão',
        referencia: dados.referencia || '',
        data: dados.data || dataHora.data,
        hora: dados.hora || dataHora.hora,
        timestamp: dados.timestamp || Date.now()
      };

      const indiceExistente = reflexoes.findIndex((r) => r.id === novaReflexao.id);
      if (indiceExistente >= 0) {
        reflexoes[indiceExistente] = novaReflexao;
      } else {
        reflexoes.unshift(novaReflexao);
      }

      salvar(CHAVE_REFLEXOES, reflexoes);

      return novaReflexao;
    },

    /**
     * Exclui uma reflexão pessoal pelo ID.
     */
    excluirReflexao(id) {
      let reflexoes = this.obterReflexoes();
      reflexoes = reflexoes.filter((r) => r.id !== id);
      salvar(CHAVE_REFLEXOES, reflexoes);
      return reflexoes;
    },

    /**
     * Obtém uma reflexão específica pelo ID.
     */
    obterReflexaoPorId(id) {
      const reflexoes = this.obterReflexoes();
      return reflexoes.find((r) => r.id === id) || null;
    },

    // ==========================================
    // EXPORTAÇÃO DE ANOTAÇÕES EM ARQUIVO DE TEXTO
    // ==========================================

    /**
     * Gera o conteúdo formatado em texto legível de todas as anotações do diário.
     * @returns {string} Texto formatado com cabeçalho e todas as anotações.
     */
    gerarTextoExportacao() {
      const reflexoes = this.obterReflexoes();
      if (!reflexoes || reflexoes.length === 0) {
        return '';
      }

      const agora = new Date();
      const dataHoraExportacao = agora.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }) + ' às ' + agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      let texto = `=====================================================\n`;
      texto += `MEU DEVOCIONAL - DIÁRIO ESPIRITUAL\n`;
      texto += `Lecionário Comum Revisado\n`;
      texto += `Exportado em: ${dataHoraExportacao}\n`;
      texto += `Total de anotações: ${reflexoes.length}\n`;
      texto += `=====================================================\n\n`;

      reflexoes.forEach((r, idx) => {
        const num = idx + 1;
        const dataExibicao = r.hora ? `${r.data} às ${r.hora}` : r.data;
        const modoExibicao = r.modo || 'Devocional';
        const tituloExibicao = r.titulo || r.pergunta || 'Reflexão Pessoal';
        const refExibicao = r.referencia ? ` [${r.referencia}]` : '';

        texto += `-----------------------------------------------------\n`;
        texto += `#${num} - ${dataExibicao}\n`;
        texto += `MODO: ${modoExibicao}${refExibicao}\n`;
        texto += `TÍTULO: ${tituloExibicao}\n`;
        texto += `-----------------------------------------------------\n\n`;
        texto += `${r.texto.trim()}\n\n\n`;
      });

      texto += `=====================================================\n`;
      texto += `Fim do Diário Espiritual\n`;
      texto += `«Alegrem-se sempre no Senhor.» — Filipenses 4:4\n`;
      texto += `=====================================================\n`;

      return texto;
    },

    /**
     * Exporta as anotações do diário como um arquivo de texto (.txt) para download no dispositivo.
     * @param {string} [nomeArquivoCustomizado] Nome opcional para o arquivo gerado.
     * @returns {Object} Resultado da operação { sucesso: boolean, mensagem: string, total: number, conteudo?: string }
     */
    exportarDiarioParaArquivo(nomeArquivoCustomizado) {
      const reflexoes = this.obterReflexoes();
      if (!reflexoes || reflexoes.length === 0) {
        return {
          sucesso: false,
          mensagem: 'Não há anotações no diário para exportar.',
          total: 0
        };
      }

      const conteudo = this.gerarTextoExportacao();
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const dia = String(hoje.getDate()).padStart(2, '0');
      const nomeArquivo = nomeArquivoCustomizado || `meu-devocional-diario-${ano}-${mes}-${dia}.txt`;

      try {
        if (
          typeof window !== 'undefined' &&
          typeof document !== 'undefined' &&
          typeof document.createElement === 'function' &&
          typeof URL !== 'undefined' &&
          typeof URL.createObjectURL === 'function' &&
          typeof Blob !== 'undefined'
        ) {
          const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');

          link.href = url;
          link.download = nomeArquivo;
          link.style.display = 'none';

          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            if (link.parentNode) {
              link.parentNode.removeChild(link);
            }
            URL.revokeObjectURL(url);
          }, 300);

          return {
            sucesso: true,
            mensagem: `Arquivo "${nomeArquivo}" exportado com sucesso!`,
            total: reflexoes.length,
            nomeArquivo,
            conteudo
          };
        }

        return {
          sucesso: true,
          mensagem: `Exportação gerada com sucesso (${nomeArquivo}).`,
          total: reflexoes.length,
          nomeArquivo,
          conteudo
        };
      } catch (e) {
        console.error('Erro ao exportar arquivo do diário:', e);
        return {
          sucesso: false,
          mensagem: 'Erro ao gerar o arquivo de download: ' + e.message,
          total: reflexoes.length,
          conteudo
        };
      }
    },

    // Métodos legados de compatibilidade direta
    obterEntradasDiario() {
      return this.obterReflexoes();
    },

    adicionarEntradaDiario(entrada) {
      return this.salvarReflexao({
        data: entrada.date,
        modo: entrada.mode,
        pergunta: entrada.q,
        titulo: entrada.q,
        texto: entrada.text
      });
    },

    // ==========================================
    // HISTÓRICO DE CONCLUSÕES
    // ==========================================
    obterDevocionaisConcluidos() {
      return obter(CHAVE_DIAS, []);
    },

    registrarConclusao(key) {
      const dias = this.obterDevocionaisConcluidos();
      if (dias.indexOf(key) < 0) {
        dias.push(key);
        salvar(CHAVE_DIAS, dias);
      }
      return dias;
    },

    removerConclusao(key) {
      let dias = this.obterDevocionaisConcluidos();
      if (dias.indexOf(key) >= 0) {
        dias = dias.filter((d) => d !== key);
        salvar(CHAVE_DIAS, dias);
      }
      return dias;
    },

    // ==========================================
    // CONTROLE DE PARTES CONCLUÍDAS DO DEVOCIONAL
    // (Escrituras / Scripture, Reflexão / Reflection, Oração / Prayer)
    // ==========================================
    obterPartesDevocional(diaKey) {
      if (!diaKey) return { scripture: false, reflection: false, prayer: false };
      const chave = 'md_partes_' + diaKey;
      const partes = obter(chave, null);
      if (partes && typeof partes === 'object') {
        return {
          scripture: !!partes.scripture,
          reflection: !!partes.reflection,
          prayer: !!partes.prayer
        };
      }
      // Se o dia já constava como concluído nos devocionais gerais, inicializa como concluído
      const concluidos = this.obterDevocionaisConcluidos();
      const jaConcluido = concluidos.indexOf(diaKey) >= 0;
      return {
        scripture: jaConcluido,
        reflection: jaConcluido,
        prayer: jaConcluido
      };
    },

    salvarPartesDevocional(diaKey, partes) {
      if (!diaKey) return { scripture: false, reflection: false, prayer: false };
      const chave = 'md_partes_' + diaKey;
      const status = {
        scripture: !!(partes && partes.scripture),
        reflection: !!(partes && partes.reflection),
        prayer: !!(partes && partes.prayer)
      };
      salvar(chave, status);

      // Sincroniza com a conclusão global do dia: se completou as 3 partes, conclui o dia
      if (status.scripture && status.reflection && status.prayer) {
        this.registrarConclusao(diaKey);
      } else {
        this.removerConclusao(diaKey);
      }
      return status;
    },

    alternarParteDevocional(diaKey, parte) {
      const atuais = this.obterPartesDevocional(diaKey);
      if (parte && parte in atuais) {
        atuais[parte] = !atuais[parte];
        return this.salvarPartesDevocional(diaKey, atuais);
      }
      return atuais;
    },

    marcarParteDevocional(diaKey, parte, concluido = true) {
      const atuais = this.obterPartesDevocional(diaKey);
      if (parte && parte in atuais) {
        atuais[parte] = !!concluido;
        return this.salvarPartesDevocional(diaKey, atuais);
      }
      return atuais;
    },

    // ==========================================
    // PREFERÊNCIAS DO USUÁRIO
    // ==========================================
    obterVersaoBiblia() {
      return obter(CHAVE_VERSAO, 'NAA');
    },

    salvarVersaoBiblia(ver) {
      salvar(CHAVE_VERSAO, ver);
    },

    obterModo() {
      let modo = obter(CHAVE_MODO, 'padrao');
      if (modo === 'lectio') modo = 'aprofundado';
      return (typeof MODES !== 'undefined' && MODES[modo]) ? modo : 'padrao';
    },

    salvarModo(modo) {
      salvar(CHAVE_MODO, modo);
    },

    // ==========================================
    // MODO LEITURA / PREFERÊNCIAS DE FOCO
    // ==========================================
    obterPreferenciasLeitura() {
      return obter(CHAVE_PREF_LEITURA, {
        tamanho: 'md',   // 'sm' | 'md' | 'lg' | 'xl'
        tema: 'sepia',   // 'sepia' | 'light' | 'dark'
        serif: true      // serif (Newsreader/Georgia) vs sans-serif
      });
    },

    salvarPreferenciasLeitura(prefs) {
      const atuais = this.obterPreferenciasLeitura();
      const novo = { ...atuais, ...prefs };
      salvar(CHAVE_PREF_LEITURA, novo);
      return novo;
    },

    // ==========================================
    // LEMBRETES E NOTIFICAÇÕES DIÁRIAS
    // ==========================================
    obterConfigNotificacoes() {
      return obter('md_notificacoes', {
        ativo: false,
        horario: '07:00',
        titulo: 'Meu Devocional · Momento Diário',
        mensagem: 'Hora do seu devocional diário: um momento com a Palavra e em oração.',
        som: true,
        ultimoDisparoData: null
      });
    },

    salvarConfigNotificacoes(config) {
      const atuais = this.obterConfigNotificacoes();
      const novo = { ...atuais, ...config };
      salvar('md_notificacoes', novo);
      return novo;
    }
  };
})();
