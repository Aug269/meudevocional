/**
 * MEU DEVOCIONAL - NAVEGAÇÃO
 * Barra inferior e controle de rotas
 */

const Navegacao = (() => {
  const ABAS = [
    { id: 'hoje', label: 'Hoje', icone: '☀️' },
    { id: 'leituras', label: 'Leituras', icone: '📖' },
    { id: 'oracao', label: 'Oração', icone: '🕊️' },
    { id: 'exame', label: 'Exame', icone: '✍️' },
    { id: 'diario', label: 'Caderno', icone: '📓' }
  ];

  function renderizarBarra(abaAtiva) {
    return `
      <nav class="nav" role="navigation" aria-label="Navegação principal">
        ${ABAS.map((aba) => `
          <button 
            type="button"
            class="${aba.id === abaAtiva ? 'active' : ''}" 
            data-aba="${aba.id}"
            onclick="Navegacao.irPara('${aba.id}')"
            aria-label="${aba.label}">
            <span style="display: block; font-size: 16px; margin-bottom: 2px;">${aba.icone}</span>
            <span>${aba.label}</span>
          </button>
        `).join('')}
      </nav>
    `;
  }

  function irPara(abaId) {
    if (!ABAS.some((a) => a.id === abaId)) return;

    Estado.definirAba(abaId);
    window.location.hash = '#' + abaId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function inicializarRotas() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (ABAS.some((a) => a.id === hash)) {
        Estado.definirAba(hash);
      }
    });

    const hashInicial = window.location.hash.replace('#', '');
    if (ABAS.some((a) => a.id === hashInicial)) {
      Estado.definirAba(hashInicial);
    }
  }

  return {
    ABAS,
    renderizarBarra,
    irPara,
    inicializarRotas
  };
})();
