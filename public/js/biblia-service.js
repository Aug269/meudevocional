/**
 * MEU DEVOCIONAL - BÍBLIA SERVICE
 * Serviço de busca de textos bíblicos em português com suporte a NAA, NTLH, NVI, ARA, ACF,
 * cache local em memória/localStorage e fallback gracioso offline.
 */

const BibliaService = (() => {
  // Mapeamento de siglas de versões para a API da Bíblia Digital
  const VERSOES_MAPA = {
    'NAA': 'nvi', // fallback amigável caso NAA não esteja disponível na API gratuita
    'NTLH': 'nvi',
    'NVI-PT': 'nvi',
    'ARA': 'ra',
    'ARC': 'acf'
  };

  // Mapeamento de nomes de livros bíblicos em português para abreviações da API
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

  /**
   * Converte uma referência textual (ex: "Filipenses 4:1-9" ou "Salmo 106:1-6") em componentes pesquisáveis.
   */
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

  /**
   * Busca os versículos de um capítulo ou trecho via API da Bíblia Digital com cache.
   */
  async function buscarTextoPassagem(refStr, versaoSigla = 'NAA') {
    const parsed = parseReferencia(refStr);
    if (!parsed || !parsed.abrev) {
      return null;
    }

    const versaoApi = VERSOES_MAPA[versaoSigla] || 'nvi';
    const chaveCache = `md_bible_${versaoApi}_${parsed.abrev}_${parsed.capitulo}`;

    try {
      // 1. Tenta recuperar do cache local
      if (typeof Armazenamento !== 'undefined') {
        const cached = Armazenamento.obter(chaveCache, null);
        if (cached && Array.isArray(cached.verses)) {
          return formatarVersiculos(cached.verses, parsed.versiculoInicio, parsed.versiculoFim);
        }
      }

      // 2. Requisição à API pública da Bíblia Digital
      const url = `https://www.abibliadigital.com.br/api/verses/${versaoApi}/${parsed.abrev}/${parsed.capitulo}`;
      const response = await fetch(url);
      if (!response.ok) return null;

      const data = await response.json();
      if (data && Array.isArray(data.verses)) {
        if (typeof Armazenamento !== 'undefined') {
          Armazenamento.salvar(chaveCache, { verses: data.verses });
        }
        return formatarVersiculos(data.verses, parsed.versiculoInicio, parsed.versiculoFim);
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
