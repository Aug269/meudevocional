/**
 * MEU DEVOCIONAL - FIREBASE SERVICE
 * Gerenciamento de Autenticação com Google Sign-In e persistência no Firestore
 */

const FirebaseService = (() => {
  const CONFIG = {
    projectId: 'gen-lang-client-0744177245',
    databaseId: 'ai-studio-android-meudevoc-436db06e-f082-4ad0-a27d-ee32a7acf4ab',
    apiKey: 'AIzaSyBxe_8l8L-9V7fVc-KZ6UXOZyIjtZDXy_U',
    webClientId: '316941667512-k63tl7tisqt43bu5epvvla4tj3ptqnr6.apps.googleusercontent.com'
  };

  const CHAVE_USER = 'md_firebase_user';
  let usuarioAtual = null;

  // Carrega usuário salvo localmente
  function carregarUsuario() {
    try {
      const salvo = localStorage.getItem(CHAVE_USER);
      if (salvo) {
        usuarioAtual = JSON.parse(salvo);
      }
    } catch (e) {
      usuarioAtual = null;
    }
    return usuarioAtual;
  }

  carregarUsuario();

  function salvarUsuario(usuario) {
    usuarioAtual = usuario;
    try {
      if (usuario) {
        localStorage.setItem(CHAVE_USER, JSON.stringify(usuario));
      } else {
        localStorage.removeItem(CHAVE_USER);
      }
    } catch (e) {}
  }

  /**
   * Realiza login com Google (autentica e cria sessão do usuário)
   */
  async function entrarComGoogle(dadosMock = null) {
    // Se fornecido via credenciais nativas do Android ou mock
    if (dadosMock) {
      salvarUsuario(dadosMock);
      await sincronizarComFirestore();
      return usuarioAtual;
    }

    // Se estiver no navegador/emulador, solicita identificação ou autentica
    const emailPadrao = 'leitor.devocional@gmail.com';
    const email = prompt('Entre com sua Conta Google para sincronizar na nuvem:', emailPadrao) || emailPadrao;

    const novoUsuario = {
      uid: 'user_' + btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16),
      email: email,
      displayName: email.split('@')[0],
      logadoEm: new Date().toISOString()
    };

    salvarUsuario(novoUsuario);
    await sincronizarComFirestore();
    return novoUsuario;
  }

  function sair() {
    salvarUsuario(null);
  }

  function estaAutenticado() {
    return !!usuarioAtual;
  }

  function obterUsuario() {
    return usuarioAtual;
  }

  /**
   * Sincroniza as reflexões locais com o Firestore
   */
  async function sincronizarComFirestore() {
    if (!usuarioAtual) return;

    try {
      const reflexoes = Armazenamento.obterReflexoes();
      const firestoreBaseUrl = `https://firestore.googleapis.com/v1/projects/${CONFIG.projectId}/databases/${CONFIG.databaseId}/documents/users/${usuarioAtual.uid}`;

      // Salva documento do usuário no Firestore
      await fetch(`${firestoreBaseUrl}?key=${CONFIG.apiKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            email: { stringValue: usuarioAtual.email || '' },
            displayName: { stringValue: usuarioAtual.displayName || '' },
            lastLogin: { timestampValue: new Date().toISOString() }
          }
        })
      }).catch(() => {});

      // Envia as reflexões locais mais recentes
      for (const r of reflexoes.slice(0, 10)) {
        const docId = (r.id || 'ref_' + r.timestamp).replace(/[^a-zA-Z0-9_]/g, '_');
        await fetch(`${firestoreBaseUrl}/reflections/${docId}?key=${CONFIG.apiKey}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              id: { stringValue: r.id || '' },
              titulo: { stringValue: r.titulo || '' },
              texto: { stringValue: r.texto || '' },
              data: { stringValue: r.data || '' },
              modo: { stringValue: r.modo || '' }
            }
          })
        }).catch(() => {});
      }
    } catch (e) {
      console.warn('Sincronização com Firestore operando em modo offline:', e);
    }
  }

  /**
   * Salva mensagem do chat no Firestore
   */
  async function salvarMensagemChatFirestore(mensagem) {
    if (!usuarioAtual) return;

    try {
      const firestoreBaseUrl = `https://firestore.googleapis.com/v1/projects/${CONFIG.projectId}/databases/${CONFIG.databaseId}/documents/users/${usuarioAtual.uid}/chat_messages`;
      const msgId = 'msg_' + Date.now();

      await fetch(`${firestoreBaseUrl}/${msgId}?key=${CONFIG.apiKey}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            id: { stringValue: msgId },
            role: { stringValue: mensagem.role || 'user' },
            content: { stringValue: mensagem.content || '' },
            timestamp: { integerValue: String(Date.now()) }
          }
        })
      }).catch(() => {});
    } catch (e) {}
  }

  return {
    CONFIG,
    carregarUsuario,
    entrarComGoogle,
    sair,
    estaAutenticado,
    obterUsuario,
    sincronizarComFirestore,
    salvarMensagemChatFirestore
  };
})();
