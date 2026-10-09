/**
 * MEU DEVOCIONAL - BÍBLIA SERVICE
 * Serviço de busca de textos bíblicos em português usando a API pública e aberta
 * bible-api.com (com cabeçalhos CORS abertos 'Access-Control-Allow-Origin: *'),
 * sem necessidade de chaves privadas e com fallback gracioso para o banco local.
 */

const BibliaService = (() => {
  // Mapeamento de nomes de livros bíblicos em português para nomes em inglês para a bible-api.com
  const LIVROS_EN = {
    'gênesis': 'genesis', 'êxodo': 'exodus', 'levítico': 'leviticus', 'números': 'numbers',
    'deuteronômio': 'deuteronomy', 'josué': 'joshua', 'juízes': 'judges', 'rute': 'ruth',
    '1 samuel': '1 samuel', '2 samuel': '2 samuel', '1 reis': '1 kings', '2 reis': '2 kings',
    '1 crônicas': '1 chronicles', '2 crônicas': '2 chronicles', 'esdras': 'ezra',
    'neemias': 'nehemiah', 'ester': 'esther', 'jó': 'job', 'salmo': 'psalms', 'salmos': 'psalms',
    'provérbios': 'proverbs', 'eclesiastes': 'ecclesiastes', 'cânticos': 'song of solomon',
    'isaías': 'isaiah', 'jeremias': 'jeremiah', 'lamentações': 'lamentations',
    'ezequiel': 'ezekiel', 'daniel': 'daniel', 'oseias': 'hosea', 'joel': 'joel',
    'amós': 'amos', 'obadias': 'obadiah', 'jonas': 'jonah', 'miqueias': 'micah',
    'naum': 'nahum', 'habacuque': 'habakkuk', 'sofanias': 'zephaniah', 'ageu': 'haggai',
    'zacarias': 'zechariah', 'malaquias': 'malachi', 'mateus': 'matthew', 'marcos': 'mark',
    'lucas': 'luke', 'joão': 'john', 'atos': 'acts', 'romanos': 'romans',
    '1 coríntios': '1 corinthians', '2 coríntios': '2 corinthians', 'gálatas': 'galatians',
    'efésios': 'ephesians', 'filipenses': 'philippians', 'colossenses': 'colossians',
    '1 tessalonicenses': '1 thessalonians', '2 tessalonicenses': '2 thessalonians',
    '1 timóteo': '1 timothy', '2 timóteo': '2 timothy', 'tito': 'titus',
    'filemom': 'philemon', 'hebreus': 'hebrews', 'tiago': 'james', '1 pedro': '1 peter',
    '2 pedro': '2 peter', '1 joão': '1 john', '2 joão': '2 john', '3 joão': '3 john',
    'judas': 'jude', 'revelação': 'revelation', 'apocalipse': 'revelation'
  };

  function parseReferencia(refStr) {
    if (!refStr) return null;
    const limpo = refStr.trim().replace(/–/g, '-');
    const match = limpo.match(/^((?:\d\s+)?[^\d:]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?/);
    if (!match) return null;

    const nomeLivro = match[1].trim().toLowerCase();
    const cap = parseInt(match[2], 10);
    const vInicio = match[3] ? parseInt(match[3], 10) : null;
    const vFim = match[4] ? parseInt(match[4], 10) : vInicio;

    const nomeEn = LIVROS_EN[nomeLivro] || nomeLivro;
    return {
      livroNome: match[1].trim(),
      nomeEn,
      capitulo: cap,
      versiculoInicio: vInicio,
      versiculoFim: vFim
    };
  }

  async function buscarTextoPassagem(refStr, versaoSigla = 'NAA') {
    const parsed = parseReferencia(refStr);
    if (!parsed) {
      return null;
    }

    const passagemQuery = parsed.versiculoInicio
      ? `${parsed.nomeEn}+${parsed.capitulo}:${parsed.versiculoInicio}${parsed.versiculoFim && parsed.versiculoFim !== parsed.versiculoInicio ? '-' + parsed.versiculoFim : ''}`
      : `${parsed.nomeEn}+${parsed.capitulo}`;

    const chaveCache = `md_bible_open_${passagemQuery}`;

    try {
      // 1. Tenta recuperar do cache local no dispositivo
      if (typeof Armazenamento !== 'undefined') {
        const cached = Armazenamento.obter(chaveCache, null);
        if (cached && cached.texto) {
          return cached.texto;
        }
      }

      // 2. Requisição para bible-api.com com tradução Almeida em português e suporte CORS público
      const url = `https://bible-api.com/${encodeURIComponent(passagemQuery)}?translation=almeida`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.verses) && data.verses.length) {
          const textoFormatado = data.verses.map((v) => `${v.verse}. ${(v.text || '').trim()}`).join('\n\n');
          if (typeof Armazenamento !== 'undefined') {
            Armazenamento.salvar(chaveCache, { texto: textoFormatado });
          }
          return textoFormatado;
        }
      }
    } catch (err) {
      console.warn('Uso do banco local para exibição do texto bíblico completo:', err);
    }
    return null;
  }

  return {
    parseReferencia,
    buscarTextoPassagem
  };
})();
