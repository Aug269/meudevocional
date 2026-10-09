/**
 * MEU DEVOCIONAL - NAVEGAÇÃO
 * Controle de abas inferiores e rotas da aplicação
 */

const Navegacao = (() => {

  function atualizarBarra(screen) {
    const n1 = document.getElementById('n1');
    const n2 = document.getElementById('n2');
    const n3 = document.getElementById('n3');
    if (!n1 || !n2) return;

    n1.className = screen === 'home' || screen === 'step' || screen === 'read' || screen === 'done' ? 'on' : '';
    n2.className = screen === 'diary' ? 'on' : '';
    if (n3) {
      n3.className = screen === 'chat' ? 'on' : '';
    }
  }

  function irPara(screen) {
    Estado.atualizar({
      screen: screen,
      showModes: false,
      showDays: false
    });
    window.scrollTo(0, 0);
  }

  return {
    atualizarBarra,
    irPara
  };
})();
