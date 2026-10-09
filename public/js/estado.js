/**
 * MEU DEVOCIONAL - ESTADO
 * Estado reativo da aplicação do Lecionário Comum Revisado
 */

const Estado = {
  screen: 'home', // 'home' | 'step' | 'done' | 'read' | 'diary'
  mode: 'padrao', // 'rapido' | 'padrao' | 'aprofundado'
  i: 0,           // índice do passo atual no modo selecionado
  ans: '',        // resposta do exame de consciência
  showModes: false,
  r: 0,           // índice da leitura aberta no leitor
  ver: 'NAA',     // tradução bíblica: NAA, ARA, NVI-PT, ARC
  prev: 'home',
  diaIndex: 0,    // dia selecionado em DIAS_RCL
  mostrarTextoBiblicoCompleto: true,

  // Estado do Chatbot Gemini (Conselheiro Bíblico)
  chatModelo: 'geral', // 'geral' (gemini-3.5-flash) | 'complexo' (gemini-3.1-pro-preview) | 'rapido' (gemini-3.1-flash-lite)
  chatCarregando: false,
  rascunhoChat: '',
  chatMensagens: [
    {
      role: 'model',
      content: 'Graça e paz! Sou seu Conselheiro Bíblico no Meu Devocional. Como posso ajudar você hoje na sua meditação do Lecionário Comum Revisado ou na aplicação das Escrituras?',
      timestamp: Date.now()
    }
  ],

  get diaAtual() {
    return (typeof DIAS_RCL !== 'undefined' && DIAS_RCL[this.diaIndex]) ? DIAS_RCL[this.diaIndex] : DIAS_RCL[0];
  },

  versiculoOffset: 0,

  get versiculoDoDia() {
    if (typeof VERSICULOS_DO_DIA === 'undefined' || !VERSICULOS_DO_DIA.length) {
      return {
        texto: (this.diaAtual && this.diaAtual.verse) || '«Alegrem-se sempre no Senhor; outra vez digo: alegrem-se!»',
        referencia: (this.diaAtual && this.diaAtual.vref) || 'Filipenses 4:4',
        tema: 'Alegria e Paz'
      };
    }
    const base = typeof obterVersiculoDoDia === 'function' ? obterVersiculoDoDia() : VERSICULOS_DO_DIA[0];
    if (this.versiculoOffset === 0) return base;
    const baseIdx = VERSICULOS_DO_DIA.indexOf(base);
    const novoIdx = (baseIdx + this.versiculoOffset) % VERSICULOS_DO_DIA.length;
    return VERSICULOS_DO_DIA[novoIdx >= 0 ? novoIdx : novoIdx + VERSICULOS_DO_DIA.length];
  },

  get passosAtuais() {
    return this.diaAtual.passos || {};
  },

  _ouvintes: [],

  inscrever(fn) {
    this._ouvintes.push(fn);
  },

  notificar() {
    this._ouvintes.forEach((fn) => {
      try {
        fn(this);
      } catch (e) {
        console.error('Erro no ouvinte de estado:', e);
      }
    });
  },

  atualizar(parcial) {
    Object.assign(this, parcial);
    this.notificar();
  }
};
