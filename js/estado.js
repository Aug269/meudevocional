/**
 * MEU DEVOCIONAL - ESTADO
 * Gerenciamento central do estado da aplicação
 */

const Estado = {
  // Aba ativa na navegação: 'hoje' | 'leituras' | 'oracao' | 'exame' | 'diario'
  abaAtiva: 'hoje',

  // Devocionais disponíveis e o atual
  devocionais: typeof DEVOCIONAIS !== 'undefined' ? DEVOCIONAIS : [],
  indiceDevocionalAtual: 0,
  get devocionalAtual() {
    return this.devocionais[this.indiceDevocionalAtual] || this.devocionais[0] || null;
  },

  // Sub-abas e filtros
  leituraAtiva: 'evangelho', // 'primeiraLeitura' | 'salmo' | 'evangelho'
  filtroOracoes: 'todas',    // 'todas' | 'manhã' | 'noite' | 'classicas'
  filtroDiario: 'todos',     // 'todos' | 'Reflexão' | 'Oração' | 'Gratidão' | 'Propósito'

  // Timer de Silêncio e Oração
  timer: {
    minutosSelecionados: 5,
    segundosTotais: 300,
    segundosRestantes: 300,
    rodando: false,
    intervalId: null
  },

  // Estado do Exame de Consciência
  exame: {
    respostas: {}, // { 'ex_1': true, ... }
    proposito: '',
    concluidoHoje: false
  },

  // Histórico de conclusões e anotações
  historicoConclusoes: [],
  anotacoes: [],

  // Formulário temporário do diário
  formularioDiario: {
    titulo: '',
    texto: '',
    tag: 'Reflexão'
  },

  // Mensagem temporária de notificação/alerta
  mensagemToast: null,

  // Ouvintes de mudanças de estado
  _ouvintes: [],

  inscrever(fn) {
    this._ouvintes.push(fn);
  },

  notificar() {
    this._ouvintes.forEach((fn) => {
      try {
        fn(this);
      } catch (err) {
        console.error('Erro no ouvinte de estado:', err);
      }
    });
  },

  atualizar(parcial) {
    Object.assign(this, parcial);
    this.notificar();
  },

  definirAba(aba) {
    if (this.abaAtiva !== aba) {
      this.abaAtiva = aba;
      this.notificar();
    }
  },

  mostrarMensagem(texto, duracaoMs = 3000) {
    this.mensagemToast = texto;
    this.notificar();
    setTimeout(() => {
      if (this.mensagemToast === texto) {
        this.mensagemToast = null;
        this.notificar();
      }
    }, duracaoMs);
  }
};
