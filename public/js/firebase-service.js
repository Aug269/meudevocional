/**
 * MEU DEVOCIONAL - FIREBASE SERVICE
 * Login real com Google (Firebase Authentication) e sincronização no Firestore.
 * Cada requisição ao Firestore envia o token do usuário logado, então as regras
 * (request.auth.uid == userId) garantem que cada pessoa só acessa a própria conta.
 */

const FirebaseService = (() => {
  const CONFIG = {
    projectId: 'gen-lang-client-0744177245',
    databaseId: 'ai-studio-android-meudevoc-436db06e-f082-4ad0-a27d-ee32a7acf4ab'
  };

  const CHAVE_USER_LEGADO = 'md_firebase_user';
  let usuarioAtual = null;
  let auth = null;
  let erroInicializacao = null;

  // Remove a "sessão" falsa antiga (e-mail digitado sem verificação)
  try { localStorage.removeItem(CHAVE_USER_LEGADO); } catch (e) {}

  function notificarMudanca() {
    try { window.dispatchEvent(new CustomEvent('md-auth-mudou')); } catch (e) {}
  }

  function inicializar() {
    const cfg = window.FIREBASE_WEB_CONFIG;
    if (typeof firebase === 'undefined' || !firebase.auth) {
      erroInicializacao = 'Não foi possível carregar o Firebase. Verifique sua conexão.';
      return;
    }
    if (!cfg || !cfg.apiKey || cfg.apiKey.startsWith('COLE_AQUI')) {
      erroInicializacao = 'Login ainda não configurado: falta a apiKey Web do Firebase em js/firebase-config.js.';
      return;
    }
    try {
      const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
      auth = app.auth();
      auth.onAuthStateChanged((u) => {
        usuarioAtual = u
          ? { uid: u.uid, email: u.email || '', displayName: u.displayName || '', foto: u.photoURL || '' }
          : null;
        notificarMudanca();
        if (usuarioAtual) sincronizarComFirestore();
      });
      // Conclui um login feito por redirecionamento (quando o popup foi bloqueado)
      auth.getRedirectResult().catch((e) => console.error('Falha no login por redirecionamento:', e));
    } catch (e) {
      erroInicializacao = 'Erro ao iniciar o Firebase: ' + e.message;
    }
  }

  inicializar();

  function eWebViewAndroid() {
    return !!(window.AndroidBridge && typeof window.AndroidBridge.isNativeApp === 'function');
  }

  /**
   * Abre o login real do Google. Lança erro com mensagem amigável se falhar.
   */
  async function entrarComGoogle() {
    if (!auth) throw new Error(erroInicializacao || 'Login indisponível.');
    if (eWebViewAndroid()) {
      throw new Error('No app Android o login com Google ainda não está disponível. Use a versão web do Meu Devocional para entrar.');
    }
    const provedor = new firebase.auth.GoogleAuthProvider();
    provedor.setCustomParameters({ prompt: 'select_account' });
    try {
      await auth.signInWithPopup(provedor);
    } catch (e) {
      if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') {
        await auth.signInWithRedirect(provedor);
        return null;
      }
      if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') return null;
      if (e.code === 'auth/unauthorized-domain') {
        throw new Error('Este endereço não está autorizado no Firebase. Adicione o domínio em Authentication > Configurações > Domínios autorizados.');
      }
      throw new Error('Não foi possível entrar com o Google: ' + (e.message || e.code));
    }
    return usuarioAtual;
  }

  async function sair() {
    if (auth) await auth.signOut();
    usuarioAtual = null;
    notificarMudanca();
  }

  function estaAutenticado() {
    return !!(auth && auth.currentUser);
  }

  function obterUsuario() {
    return estaAutenticado() ? usuarioAtual : null;
  }

  function carregarUsuario() {
    return obterUsuario();
  }

  function obterErroInicializacao() {
    return erroInicializacao;
  }

  // Requisição autenticada: envia o token do Google/Firebase do usuário.
  async function requisitarFirestore(url, opcoes = {}) {
    if (!estaAutenticado()) throw new Error('Usuário não autenticado');
    const token = await auth.currentUser.getIdToken();
    const resp = await fetch(url, {
      ...opcoes,
      headers: { ...(opcoes.headers || {}), Authorization: 'Bearer ' + token }
    });
    if (!resp.ok) {
      const corpo = await resp.text().catch(() => '');
      throw new Error(`Firestore ${resp.status}: ${corpo.slice(0, 300)}`);
    }
    return resp;
  }

  function urlBaseUsuario() {
    const uid = encodeURIComponent(auth.currentUser.uid);
    return `https://firestore.googleapis.com/v1/projects/${CONFIG.projectId}/databases/${CONFIG.databaseId}/documents/users/${uid}`;
  }

  /**
   * Sincroniza as reflexões locais com o Firestore
   */
  async function sincronizarComFirestore() {
    if (!estaAutenticado()) return { sucesso: false, erro: 'Usuário não autenticado' };

    try {
      const reflexoes = Armazenamento.obterReflexoes();
      const base = urlBaseUsuario();
      const u = auth.currentUser;

      await requisitarFirestore(`${base}?updateMask.fieldPaths=email&updateMask.fieldPaths=displayName&updateMask.fieldPaths=lastLogin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            email: { stringValue: u.email || '' },
            displayName: { stringValue: u.displayName || '' },
            lastLogin: { timestampValue: new Date().toISOString() }
          }
        })
      });

      for (const r of reflexoes.slice(0, 50)) {
        const docId = (r.id || 'ref_' + r.timestamp).replace(/[^a-zA-Z0-9_]/g, '_');
        await requisitarFirestore(`${base}/reflections/${docId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              id: { stringValue: r.id || '' },
              titulo: { stringValue: r.titulo || '' },
              texto: { stringValue: r.texto || '' },
              data: { stringValue: r.data || '' },
              modo: { stringValue: r.modo || '' },
              timestamp: { integerValue: String(r.timestamp || 0) }
            }
          })
        });
      }
      return { sucesso: true };
    } catch (e) {
      console.error('Falha na sincronização com o Firestore:', e);
      return { sucesso: false, erro: e.message };
    }
  }

  /**
   * Salva mensagem do chat no Firestore
   */
  async function salvarMensagemChatFirestore(mensagem) {
    if (!estaAutenticado()) return { sucesso: false, erro: 'Usuário não autenticado' };

    try {
      const msgId = 'msg_' + Date.now();
      await requisitarFirestore(`${urlBaseUsuario()}/chat_messages/${msgId}`, {
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
      });
      return { sucesso: true };
    } catch (e) {
      console.error('Falha ao salvar mensagem no Firestore:', e);
      return { sucesso: false, erro: e.message };
    }
  }

  return {
    CONFIG,
    carregarUsuario,
    entrarComGoogle,
    sair,
    estaAutenticado,
    obterUsuario,
    obterErroInicializacao,
    sincronizarComFirestore,
    salvarMensagemChatFirestore
  };
})();
