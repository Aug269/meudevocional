/**
 * MEU DEVOCIONAL - BÍBLIA SERVICE
 * Serviço de busca de textos bíblicos em português usando a Biblia Search API
 * (pesquisarnabiblia.com.br) como provedor primário, com fallback em bible-api.com
 * e cache local offline no dispositivo.
 */

const BibliaService = (() => {
  function obterApiKeySearch() {
    if (typeof window !== 'undefined') {
      if (window.SEARCH_BIBLE_API_KEY) return window.SEARCH_BIBLE_API_KEY;
      try {
        const salva = localStorage.getItem('search_bible_api_key');
        if (salva) return salva;
      } catch (e) {}
    }
    return '';
  }

  const VERSOES_SEARCH_ID = {
    'NAA': 1,
    'ARA': 2,
    'ARC': 3,
    'NVI-PT': 4,
    'NTLH': 5
  };

  const LIVROS_ABREV = {
    'gênesis': 'gn', 'êxodo': 'ex', 'levítico': 'lv', 'números': 'nm', 'deuteronômio': 'dt',
    'josué': 'js', 'juízes': 'jz', 'rute': 'rt', '1 samuel': '1sm', '2 samuel': '2sm',
    '1 reis': '1rg', '2 reis': '2rg', '1 crônicas': '1cr', '2 crônicas': '2cr',
    'esdras': 'ez', 'neemias': 'ne', 'ester': 'et', 'jó': 'job', 'salmo': 'sl', 'salmos': 'sl',
    'provérbios': 'pv', 'eclesiastes': 'ec', 'cânticos': 'ct', 'isaías': 'is', 'jeremias': 'jr',
    'lamentações': 'lm', 'ezequiel': 'ezk', 'daniel': 'dn', 'oseias': 'os', 'joel': 'jl',
    'amós': 'am', 'obadias': 'ob', 'jonas': 'jn', 'miqueias': 'mq', 'naum': 'na',
    'habacuque': 'hc', 'sofanias': 'sf', 'ageu': 'ag', 'zacarias': 'zc', 'malaquias': 'ml',
    'mateus': 'mt', 'marcos': 'mc', 'lucas': 'lc', 'joão': 'jo', 'atos': 'at',
    'romanos': 'rm', '1 coríntios': '1co', '2 coríntios': '2co', 'gálatas': 'gl',
    'efésios': 'ef', 'filipenses': 'fp', 'colossenses': 'cl', '1 tessalonicenses': '1ts',
    '2 tessalonicenses': '2ts', '1 timóteo': '1tm', '2 timóteo': '2tm', 'tito': 'tt',
    'filemom': 'fm', 'hebreus': 'hb', 'tiago': 'tg', '1 pedro': '1pe', '2 pedro': '2pe',
    '1 joão': '1jo', '2 joão': '2jo', '3 joão': '3jo', 'judas': 'jd', 'revelação': 'ap', 'apocalipse': 'ap'
  };

  const LIVROS_SEARCH_ID = {
    'gn': 1, 'ex': 2, 'lv': 3, 'nm': 4, 'dt': 5,
    'js': 6, 'jz': 7, 'rt': 8, '1sm': 9, '2sm': 10,
    '1rg': 11, '2rg': 12, '1cr': 13, '2cr': 14,
    'ez': 15, 'ne': 16, 'et': 17, 'job': 18, 'sl': 19,
    'pv': 20, 'ec': 21, 'ct': 22, 'is': 23, 'jr': 24,
    'lm': 25, 'ezk': 26, 'dn': 27, 'os': 28, 'jl': 29,
    'am': 30, 'ob': 31, 'jn': 32, 'mq': 33, 'na': 34,
    'hc': 35, 'sf': 36, 'ag': 37, 'zc': 38, 'ml': 39,
    'mt': 40, 'mc': 41, 'lc': 42, 'jo': 43, 'at': 44,
    'rm': 45, '1co': 46, '2co': 47, 'gl': 48,
    'ef': 49, 'fp': 50, 'cl': 51, '1ts': 52,
    '2ts': 53, '1tm': 54, '2tm': 55, 'tt': 56,
    'fm': 57, 'hb': 58, 'tg': 59, '1pe': 60, '2pe': 61,
    '1jo': 62, '2jo': 63, '3jo': 64, 'jd': 65, 'ap': 66
  };

  const LIVROS_EN = {
    'gn': 'genesis', 'ex': 'exodus', 'lv': 'leviticus', 'nm': 'numbers',
    'dt': 'deuteronomy', 'js': 'joshua', 'jz': 'judges', 'rt': 'ruth',
    '1sm': '1 samuel', '2sm': '2 samuel', '1rg': '1 kings', '2rg': '2 kings',
    '1cr': '1 chronicles', '2cr': '2 chronicles', 'ez': 'ezra',
    'ne': 'nehemiah', 'et': 'esther', 'job': 'job', 'sl': 'psalms',
    'pv': 'proverbs', 'ec': 'ecclesiastes', 'ct': 'song of solomon',
    'is': 'isaiah', 'jr': 'jeremiah', 'lm': 'lamentations',
    'ezk': 'ezekiel', 'dn': 'daniel', 'os': 'hosea', 'jl': 'joel',
    'am': 'amos', 'ob': 'obadiah', 'jn': 'jonah', 'mq': 'micah',
    'na': 'nahum', 'hc': 'habakkuk', 'sf': 'zephaniah', 'ag': 'haggai',
    'zc': 'zechariah', 'ml': 'malachi', 'mt': 'matthew', 'mc': 'mark',
    'lc': 'luke', 'jo': 'john', 'at': 'acts', 'rm': 'romans',
    '1co': '1 corinthians', '2co': '2 corinthians', 'gl': 'galatians',
    'ef': 'ephesians', 'fp': 'philippians', 'cl': 'colossians',
    '1ts': '1 thessalonians', '2ts': '2 thessalonians',
    '1tm': '1 timothy', '2tm': '2 timothy', 'tt': 'titus',
    'fm': 'philemon', 'hb': 'hebrews', 'tg': 'james', '1pe': '1 peter',
    '2pe': '2 peter', '1jo': '1 john', '2jo': '2 john', '3jo': '3 john',
    'jd': 'jude', 'ap': 'revelation'
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

    const abrev = LIVROS_ABREV[nomeLivro] || null;
    return {
      livroNome: match[1].trim(),
      abrev,
      capitulo: cap,
      versiculoInicio: vInicio,
      versiculoFim: vFim
    };
  }

  async function buscarTextoPassagem(refStr, versaoSigla = 'NAA') {
    const parsed = parseReferencia(refStr);
    if (!parsed || !parsed.abrev) {
      return null;
    }

    const bookId = LIVROS_SEARCH_ID[parsed.abrev] || 1;
    const versionId = VERSOES_SEARCH_ID[versaoSigla] || 1;
    const chaveCache = `md_search_api_v${versionId}_b${bookId}_c${parsed.capitulo}`;

    try {
      // 1. Tenta recuperar do cache local no dispositivo
      if (typeof Armazenamento !== 'undefined') {
        const cached = Armazenamento.obter(chaveCache, null);
        if (cached && Array.isArray(cached.verses)) {
          return formatarVersiculos(cached.verses, parsed.versiculoInicio, parsed.versiculoFim);
        }
      }

      // 2. Busca via Biblia Search API (pesquisarnabiblia.com.br) caso exista chave
      const apiKey = obterApiKeySearch();
      if (apiKey) {
        try {
          const urlSearchApi = `https://pesquisarnabiblia.com.br/api-projeto/api/get_verses.php?version_id=${versionId}&book_id=${bookId}&chapter_id=${parsed.capitulo}`;
          const resp = await fetch(urlSearchApi, {
            headers: {
              'Authorization': `Bearer ${apiKey}`
            }
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data && Array.isArray(data.verses) && data.verses.length) {
              const mappedVerses = data.verses.map((v) => ({
                number: v.verse_number,
                text: (v.text || '').trim()
              }));
              if (typeof Armazenamento !== 'undefined') {
                Armazenamento.salvar(chaveCache, { verses: mappedVerses });
              }
              return formatarVersiculos(mappedVerses, parsed.versiculoInicio, parsed.versiculoFim);
            }
          }
        } catch (e) {
          // Fallback
        }
      }

      // 3. Fallback para bible-api.com
      try {
        const nomeEn = LIVROS_EN[parsed.abrev] || parsed.abrev;
        const passagemQuery = parsed.versiculoInicio
          ? `${nomeEn}+${parsed.capitulo}:${parsed.versiculoInicio}${parsed.versiculoFim && parsed.versiculoFim !== parsed.versiculoInicio ? '-' + parsed.versiculoFim : ''}`
          : `${nomeEn}+${parsed.capitulo}`;

        const url = `https://bible-api.com/${encodeURIComponent(passagemQuery)}?translation=almeida`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.verses) && data.verses.length) {
            return data.verses.map((v) => `${v.verse}. ${(v.text || '').trim()}`).join('\n\n');
          }
        }
      } catch (e) {
        // Fallback local
      }
    } catch (err) {
      console.warn('Falha na requisição da Bíblia online, usando fallback local:', err);
    }
    return null;
  }

  function formatarVersiculos(verses, vInicio, vFim) {
    let filtrados = verses;
    if (vInicio !== null) {
      const fim = vFim || vInicio;
      filtrados = verses.filter((v) => v.number >= vInicio && v.number <= fim);
    }
    return filtrados.map((v) => `${v.number}. ${v.text}`).join('\n\n');
  }

  return {
    parseReferencia,
    buscarTextoPassagem
  };
})();
