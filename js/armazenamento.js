/**
 * MEU DEVOCIONAL - ARMAZENAMENTO
 * Camada de persistência local (localStorage com fallback em memória)
 */

const Armazenamento = (() => {
  const CHAVE_CONCLUSOES = 'meu_devocional_conclusoes';
  const CHAVE_ANOTACOES = 'meu_devocional_anotacoes';
  const CHAVE_EXAMES = 'meu_devocional_exames';
  const CHAVE_CONFIG = 'meu_devocional_config';

  // Memória fallback caso o localStorage esteja indisponível
  const memoria = {
    [CHAVE_CONCLUSOES]: [],
    [CHAVE_ANOTACOES]: [],
    [CHAVE_EXAMES]: {},
    [CHAVE_CONFIG]: {}
  };

  function storageDisponivel() {
    try {
      const teste = '__teste_storage__';
      window.localStorage.setItem(teste, teste);
      window.localStorage.removeItem(teste);
      return true;
    } catch (e) {
      return false;
    }
  }

  const temStorage = storageDisponivel();

  function lerJson(chave, valorPadrao) {
    if (!temStorage) return memoria[chave] !== undefined ? memoria[chave] : valorPadrao;
    try {
      const item = window.localStorage.getItem(chave);
      return item ? JSON.parse(item) : valorPadrao;
    } catch (e) {
      console.warn('Erro ao ler do storage:', e);
      return valorPadrao;
    }
  }

  function gravarJson(chave, valor) {
    memoria[chave] = valor;
    if (!temStorage) return;
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      console.warn('Erro ao gravar no storage:', e);
    }
  }

  function formatarDataHoje() {
    const d = new Date();
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  return {
    obterDataHoje: formatarDataHoje,

    // ==========================================
    // CONCLUSÕES DE DEVOCIONAL & SEQUÊNCIA (STREAK)
    // ==========================================
    obterConclusoes() {
      return lerJson(CHAVE_CONCLUSOES, []);
    },

    salvarConclusaoDevocional(devocionalId) {
      const hoje = formatarDataHoje();
      const lista = this.obterConclusoes();
      const jaExiste = lista.some((c) => c.data === hoje && c.devocionalId === devocionalId);

      if (!jaExiste) {
        lista.push({
          devocionalId,
          data: hoje,
          timestamp: Date.now()
        });
        gravarJson(CHAVE_CONCLUSOES, lista);
      }
      return lista;
    },

    removerConclusaoDevocional(devocionalId) {
      const hoje = formatarDataHoje();
      let lista = this.obterConclusoes();
      lista = lista.filter((c) => !(c.data === hoje && c.devocionalId === devocionalId));
      gravarJson(CHAVE_CONCLUSOES, lista);
      return lista;
    },

    foiConcluidoHoje(devocionalId) {
      const hoje = formatarDataHoje();
      const lista = this.obterConclusoes();
      return lista.some((c) => c.data === hoje && (!devocionalId || c.devocionalId === devocionalId));
    },

    calcularSequenciaDias() {
      const lista = this.obterConclusoes();
      if (!lista || lista.length === 0) return 0;

      const datasUnicas = Array.from(new Set(lista.map((c) => c.data))).sort().reverse();
      const hoje = formatarDataHoje();

      let sequencia = 0;
      let dataRef = new Date();

      // Checa se hoje ou ontem foi o último dia registrado
      const hojeRegistrado = datasUnicas.includes(hoje);
      if (!hojeRegistrado) {
        // Se não foi hoje, verifica se foi ontem
        dataRef.setDate(dataRef.getDate() - 1);
        const ontem = `${dataRef.getFullYear()}-${String(dataRef.getMonth() + 1).padStart(2, '0')}-${String(dataRef.getDate()).padStart(2, '0')}`;
        if (!datasUnicas.includes(ontem)) {
          return 0; // Sequência interrompida
        }
      }

      // Conta os dias consecutivos para trás
      for (let i = 0; i < 365; i++) {
        const ano = dataRef.getFullYear();
        const mes = String(dataRef.getMonth() + 1).padStart(2, '0');
        const dia = String(dataRef.getDate()).padStart(2, '0');
        const str = `${ano}-${mes}-${dia}`;

        if (datasUnicas.includes(str)) {
          sequencia++;
          dataRef.setDate(dataRef.getDate() - 1);
        } else {
          break;
        }
      }

      return sequencia;
    },

    // ==========================================
    // CADERNO ESPIRITUAL (ANOTAÇÕES)
    // ==========================================
    obterAnotacoes() {
      return lerJson(CHAVE_ANOTACOES, []);
    },

    salvarAnotacao(anotacao) {
      const lista = this.obterAnotacoes();
      const nova = {
        id: anotacao.id || 'nota_' + Date.now(),
        titulo: (anotacao.titulo || '').trim() || 'Sem título',
        texto: (anotacao.texto || '').trim(),
        tag: anotacao.tag || 'Reflexão',
        data: anotacao.data || formatarDataHoje(),
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now()
      };

      const indiceExistente = lista.findIndex((n) => n.id === nova.id);
      if (indiceExistente >= 0) {
        lista[indiceExistente] = nova;
      } else {
        lista.unshift(nova); // Insere no início
      }

      gravarJson(CHAVE_ANOTACOES, lista);
      return lista;
    },

    excluirAnotacao(id) {
      let lista = this.obterAnotacoes();
      lista = lista.filter((n) => n.id !== id);
      gravarJson(CHAVE_ANOTACOES, lista);
      return lista;
    },

    // ==========================================
    // EXAME DE CONSCIÊNCIA
    // ==========================================
    obterExameHoje() {
      const hoje = formatarDataHoje();
      const todos = lerJson(CHAVE_EXAMES, {});
      return todos[hoje] || { respostas: {}, proposito: '', concluido: false };
    },

    salvarExameHoje(respostas, proposito, concluido = true) {
      const hoje = formatarDataHoje();
      const todos = lerJson(CHAVE_EXAMES, {});
      todos[hoje] = {
        data: hoje,
        respostas: respostas || {},
        proposito: proposito || '',
        concluido: !!concluido,
        timestamp: Date.now()
      };
      gravarJson(CHAVE_EXAMES, todos);
      return todos[hoje];
    }
  };
})();
