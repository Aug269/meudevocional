/**
 * MEU DEVOCIONAL - LECIONÁRIO COMUM REVISADO (RCL)
 * Leituras bíblicas protestantes do Lecionário Comum Revisado, passos devocionais e reflexão
 */

const DIAS_RCL = [
  {
    key: '2026-10-11',
    label: 'Domingo, 11 de outubro',
    season: 'Tempo Comum · Ano A',
    verse: '“Alegrem-se sempre no Senhor; outra vez digo: alegrem-se!”',
    vref: 'Filipenses 4:4',
    titulo: 'O Banquete do Rei',
    reads: [
      {
        tipo: 'Antigo Testamento',
        ref: 'Êxodo 32:1–14',
        resumo: 'O bezerro de ouro e a intercessão de Moisés pelo povo.',
        texto: `Quando o povo viu que Moisés demorava a descer do monte, reuniu-se ao redor de Arão e lhe disse: "Levante-se, faça para nós deuses que vão adiante de nós..."`
      },
      {
        tipo: 'Salmo',
        ref: 'Salmo 106:1–6, 19–23',
        resumo: 'Confissão da infidelidade do povo e louvor pela misericórdia de Deus.',
        texto: `Aleluia! Deem graças ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.`
      },
      {
        tipo: 'Epístola',
        ref: 'Filipenses 4:1–9',
        resumo: 'A exortação à alegria, à oração com ação de graças e à paz de Deus.',
        texto: `Alegrem-se sempre no Senhor; outra vez digo: alegrem-se! Não andem ansiosos por coisa alguma...`
      },
      {
        tipo: 'Evangelho',
        ref: 'Mateus 22:1–14',
        resumo: 'A parábola da festa de casamento do filho do Rei.',
        texto: `O Reino dos Céus é semelhante a um rei que preparou uma festa de casamento para o seu filho...`
      }
    ],
    passos: {
      palavra: { l: 'Palavra', h: 'Mateus 22:1–14', b: 'Abra sua Bíblia neste trecho e leia devagar, com reverência.' },
      meditacao: { l: 'Meditação', h: 'O convite do Rei', b: 'A festa da graça de Deus já está preparada em Cristo.' },
      exame: { l: 'Autoexame', h: 'Onde tenho resistido ao convite de Deus?', b: 'Examine o seu coração à luz das Escrituras.', q: 1 },
      oracao: { l: 'Oração', h: 'Responda a Deus', b: 'Agradeça a Deus pelo dom de Cristo.' },
      ler: { l: 'Leitura', h: 'Ler a Palavra', b: 'Leia Mateus 22:1–14 duas vezes calmamente.' },
      meditar: { l: 'Meditação', h: 'Meditar nas Escrituras', b: 'Reflita sobre o que o texto revela sobre o caráter de Deus.' },
      orar: { l: 'Oração', h: 'Orar em Nome de Jesus', b: 'Converse com o Pai celeste sobre o que as Escrituras despertaram.' },
      descansar: { l: 'Silêncio', h: 'Descansar no Senhor', b: 'Descanse na suficiência da graça soberana de Deus.', timer: 1 }
    }
  },
  {
    key: '2026-10-12',
    label: 'Segunda-feira, 12 de outubro',
    season: 'Tempo Comum · Lecionário Semanal RCL',
    verse: '“Lâmpada para os meus pés é a tua palavra e luz, para o meu caminho.”',
    vref: 'Salmo 119:105',
    titulo: 'A Luz da Palavra de Deus',
    reads: [
      { tipo: 'Salmo', ref: 'Salmo 119:105-112', resumo: 'A Palavra como lâmpada e luz cotidiana.', texto: 'Lâmpada para os meus pés é a tua palavra e luz, para o meu caminho. Jurei e o confirmei: guardarei os teus justos juízos.' },
      { tipo: 'Antigo Testamento', ref: 'Provérbios 3:1-8', resumo: 'Confiança e sabedoria no Senhor.', texto: 'Confie no Senhor de todo o seu coração e não se apoie no seu próprio entendimento.' },
      { tipo: 'Evangelho', ref: 'João 8:12-20', resumo: 'Jesus, a Luz do Mundo.', texto: 'De novo, lhes falou Jesus, dizendo: Eu sou a luz do mundo; quem me segue não andará nas trevas, pelo contrário, terá a luz da vida.' }
    ],
    passos: {
      palavra: { l: 'Palavra', h: 'João 8:12-20', b: 'Leia a promessa de Cristo sobre caminhar na luz divina.' },
      meditacao: { l: 'Meditação', h: 'Caminhando na Luz', b: 'Onde você precisa da iluminação do Espírito Santo hoje?' },
      exame: { l: 'Autoexame', h: 'Que treva precisa ser entregue à luz?', b: 'Entregue seus medos e fraquezas ao Senhor.', q: 1 },
      oracao: { l: 'Oração', h: 'Oração pela Direção', b: 'Peça a Deus clareza e firmeza na jornada espiritual.' }
    }
  },
  {
    key: '2026-10-13',
    label: 'Terça-feira, 13 de outubro',
    season: 'Tempo Comum · Lecionário Semanal RCL',
    verse: '“Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações.”',
    vref: 'Salmo 46:1',
    titulo: 'Refúgio na Rocha Firme',
    reads: [
      { tipo: 'Salmo', ref: 'Salmo 46:1-11', resumo: 'Deus, refúgio inabalável de Seu povo.', texto: 'Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações. Por isso não temeremos...' },
      { tipo: 'Epístola', ref: '2 Coríntios 4:7-18', resumo: 'Tesouro em vasos de barro.', texto: 'Temos, porém, este tesouro em vasos de barro, para que a excelência do poder seja de Deus e não de nós.' },
      { tipo: 'Evangelho', ref: 'Marcos 4:35-41', resumo: 'Jesus acalma a tempestade.', texto: 'Ele se levantou, repreendeu o vento e disse ao mar: Acalme-se! Emudeça! O vento cessou, e fez-se grande bonança.' }
    ],
    passos: {
      palavra: { l: 'Palavra', h: 'Marcos 4:35-41', b: 'Medite na autoridade de Jesus sobre as tempestades da vida.' },
      meditacao: { l: 'Meditação', h: 'Paz no Meio do Mar', b: 'Cristo está no barco com você; não há motivo para pânico.' },
      exame: { l: 'Autoexame', h: 'Qual tempestade tem abalado sua fé?', b: 'Confie na voz dAquele que acalma o mar.', q: 1 },
      oracao: { l: 'Oração', h: 'Oração de Confiança', b: 'Entregue o controle da sua vida ao Senhor Jesus.' }
    }
  },
  {
    key: '2026-10-14',
    label: 'Quarta-feira, 14 de outubro',
    season: 'Tempo Comum · Lecionário Semanal RCL',
    verse: '“Porque pela graça vocês são salvos, mediante a fé; e isto não vem de vocês, é dom de Deus.”',
    vref: 'Efésios 2:8',
    titulo: 'A Abundância da Graça',
    reads: [
      { tipo: 'Salmo', ref: 'Salmo 103:1-13', resumo: 'Bendize, ó minha alma, ao Senhor.', texto: 'Ele é quem perdoa todas as suas iniquidades, quem cura todas as suas enfermidades.' },
      { tipo: 'Epístola', ref: 'Efésios 2:1-10', resumo: 'Vivos juntamente com Cristo pela graça.', texto: 'Deus, sendo rico em misericórdia, pelo seu muito amor com que nos amou, estando nós mortos em nossos deslizes, nos deu vida juntamente com Cristo.' },
      { tipo: 'Evangelho', ref: 'Lucas 15:11-32', resumo: 'A parábola do filho pródigo e o Pai misericordioso.', texto: 'E, levantando-se, foi para seu pai. Vinha ele ainda longe, quando seu pai o viu e, compadecido dele, correndo, o abraçou e beijou.' }
    ],
    passos: {
      palavra: { l: 'Palavra', h: 'Efésios 2:1-10', b: 'Relembre que a salvação e o favor de Deus são dádivas imerecidas.' },
      meditacao: { l: 'Meditação', h: 'Acolhido pelo Pai', b: 'Descanse nos braços do Pai celestial que o recebe com amor eterno.' },
      exame: { l: 'Autoexame', h: 'Tenho tentado merecer o amor de Deus?', b: 'Renda-se inteiramente à graça pura de Cristo.', q: 1 },
      oracao: { l: 'Oração', h: 'Gratidão pela Graça', b: 'Agradeça a Deus pelo dom gratuito da salvação.' }
    }
  },
  {
    key: '2026-10-08',
    label: 'Quinta-feira, 8 de outubro',
    season: 'Tempo Comum · Lecionário Semanal RCL',
    verse: '“O Senhor é o meu pastor; nada me faltará.”',
    vref: 'Salmo 23:1',
    titulo: 'O Cuidado do Bom Pastor',
    reads: [
      { tipo: 'Primeira Leitura', ref: 'Êxodo 24:1–8', resumo: 'A aliança no Sinai e a fidelidade à Palavra de Deus.', texto: 'Moisés veio e referiu ao povo todas as palavras do Senhor...' },
      { tipo: 'Salmo', ref: 'Salmo 106:1–6', resumo: 'Louvor ao Senhor pela sua fidelidade eterna.', texto: 'Aleluia! Deem graças ao Senhor, porque ele é bom...' },
      { tipo: 'Epístola', ref: '1 Pedro 5:1–7', resumo: 'A exortação à humildade e o cuidado paternal de Deus.', texto: 'Humilhem-se, portanto, sob a poderosa mão de Deus...' },
      { tipo: 'Evangelho', ref: 'Mateus 22:15–22', resumo: 'Dai a César o que é de César, e a Deus o que é de Deus.', texto: 'Dêem, pois, a César o que é de César e a Deus o que é de Deus.' }
    ],
    passos: {
      palavra: { l: 'Palavra', h: '1 Pedro 5:1–7', b: 'Leia o texto bíblico com atenção.' },
      meditacao: { l: 'Meditação', h: 'Lançando toda ansiedade', b: 'Deus não quer que carreguemos sozinhos os fardos.' },
      exame: { l: 'Autoexame', h: 'Quais ansiedades preciso entregar a Deus hoje?', b: 'Examine o seu coração diante de Deus.', q: 1 },
      oracao: { l: 'Oração', h: 'Entrega e Confiança', b: 'Lance sobre Cristo todas as suas ansiedades.' }
    }
  },
  {
    key: '2026-10-09',
    label: 'Sexta-feira, 9 de outubro',
    season: 'Tempo Comum · Lecionário Semanal RCL',
    verse: '“A minha graça é tudo o que você precisa, pois o meu poder se aperfeiçoa na fraqueza.”',
    vref: '2 Coríntios 12:9',
    titulo: 'Poder na Fraqueza',
    reads: [
      { tipo: 'Salmo', ref: 'Salmo 22:22-31', resumo: 'Anúncio do louvor e do reino do Senhor.', texto: 'Declararei o teu nome aos meus irmãos; cantar-te-ei louvores no meio da congregação.' },
      { tipo: 'Epístola', ref: '2 Coríntios 12:1-10', resumo: 'O espinho na carne e a suficiência da graça.', texto: 'Sinto prazer nas fraquezas, nas injúrias, nas necessidades, nas perseguições, nas angustias, por amor de Cristo. Porque, quando sou fraco, então é que sou forte.' },
      { tipo: 'Evangelho', ref: 'Lucas 23:33-43', resumo: 'A crucificação e o perdão de Jesus na cruz.', texto: 'Jesus dizia: Pai, perdoa-lhes, porque não sabem o que fazem.' }
    ],
    passos: {
      palavra: { l: 'Palavra', h: '2 Coríntios 12:1-10', b: 'Medite na graça suficiente de Deus para os dias difíceis.' },
      meditacao: { l: 'Meditação', h: 'Fortalecido em Cristo', b: 'Nossa fraqueza é o palco onde o poder de Deus é manifestado.' },
      exame: { l: 'Autoexame', h: 'Onde me sinto fraco hoje?', b: 'Deixe a graça de Cristo sustentar sua vida.', q: 1 },
      oracao: { l: 'Oração', h: 'Oração de Rendição', b: 'Consagre sua fraqueza ao Senhor e receba a força dEle.' }
    }
  },
  {
    key: '2026-10-10',
    label: 'Sábado, 10 de outubro',
    season: 'Tempo Comum · Lecionário Semanal RCL',
    verse: '“Aquietai-vos e sabei que eu sou Deus.”',
    vref: 'Salmo 46:10',
    titulo: 'Descanso e Renovação no Senhor',
    reads: [
      { tipo: 'Salmo', ref: 'Salmo 62:1-8', resumo: 'Somente em Deus a minha alma descansa.', texto: 'Somente em Deus a minha alma espera silenciosa; dele vem a minha salvação.' },
      { tipo: 'Antigo Testamento', ref: 'Isaías 30:15-18', resumo: 'No descanso e na confiança está a força.', texto: 'Em vos converterdes e em sossegardes está a vossa salvação; na tranquilidade e na confiança está a vossa força.' },
      { tipo: 'Evangelho', ref: 'Mateus 11:28-30', resumo: 'O convite do Senhor ao descanso da alma.', texto: 'Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso.' }
    ],
    passos: {
      palavra: { l: 'Palavra', h: 'Mateus 11:28-30', b: 'Escute a voz do Mestre chamando você ao repouso e à paz.' },
      meditacao: { l: 'Meditação', h: 'O Sabático do Coração', b: 'Descanse das preocupações e da correria nas mãos do Pai.' },
      exame: { l: 'Autoexame', h: 'O que tem perturbado o meu descanso?', b: 'Deposite suas ansiedades aos pés de Jesus.', q: 1 },
      oracao: { l: 'Oração', h: 'Oração de Paz', b: 'Desfrute da presença restauradora do Espírito Santo.' }
    }
  }
];

/**
 * Função utilitária para gerar dinamicamente o devocional para qualquer data ISO escolhida no calendário.
 * @param {string} isoData Data no formato YYYY-MM-DD
 * @returns {Object} Estrutura completa do Devocional do Dia
 */
function obterOuGerarDevocionalParaData(isoData) {
  if (!isoData) return DIAS_RCL[0];

  const jaCadastrado = DIAS_RCL.find((d) => d.key === isoData);
  if (jaCadastrado) return jaCadastrado;

  const partes = isoData.split('-');
  const ano = parseInt(partes[0], 10) || 2026;
  const mes = (parseInt(partes[1], 10) || 1) - 1;
  const dia = parseInt(partes[2], 10) || 1;

  const dataObj = new Date(ano, mes, dia, 12, 0, 0);
  const versiculo = obterVersiculoDoDia(dataObj);

  const dataLabel = dataObj.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const dataLabelFormatada = dataLabel.charAt(0).toUpperCase() + dataLabel.slice(1);

  return {
    key: isoData,
    label: dataLabelFormatada,
    season: 'Tempo Comum · Lecionário Comum Revisado',
    verse: versiculo.texto,
    vref: versiculo.referencia,
    titulo: `Devocional de ${dataLabelFormatada.split(',')[0]}`,
    reads: [
      {
        tipo: 'Passagem Bíblica Principal',
        ref: versiculo.referencia,
        resumo: `Palavra do dia e meditação guiada em ${versiculo.tema}.`,
        texto: `${versiculo.texto}\n\n«Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça, a fim de que o homem de Deus seja perfeito e perfeitamente habilitado para toda boa obra.» (2 Timóteo 3:16-17)`
      },
      {
        tipo: 'Salmo Devocional',
        ref: 'Salmo 23:1-6',
        resumo: 'O cuidado, a provisão e a misericórdia do Bom Pastor.',
        texto: `O Senhor é o meu pastor; nada me faltará.
Ele me faz repousar em verdes pastos e me guia mansamente a águas tranquilas.
Restaura a minha alma; guia-me pelas veredas da justiça por amor do seu nome.
Ainda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo; a tua vara e o teu cajado me consolam.`
      },
      {
        tipo: 'Novo Testamento',
        ref: 'Filipenses 4:4-9',
        resumo: 'A paz de Deus que excede todo o entendimento.',
        texto: `Alegrem-se sempre no Senhor; outra vez digo: alegrem-se! Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor. Não andem ansiosos por coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.`
      }
    ],
    passos: {
      palavra: {
        l: 'Palavra',
        h: versiculo.referencia,
        b: `Leia ${versiculo.referencia} em espírito de oração: ${versiculo.texto}`
      },
      meditacao: {
        l: 'Meditação',
        h: versiculo.tema || 'Meditação do Dia',
        b: 'Medite sobre como a verdade bíblica de hoje renova a sua fé e transforma suas atitudes cotidianas.'
      },
      exame: {
        l: 'Autoexame',
        h: 'Como aplicar no meu dia a dia?',
        b: 'Reflita diante de Deus: o que o Senhor está pedindo para você mudar, confessar ou confiar hoje?',
        q: 1
      },
      oracao: {
        l: 'Oração',
        h: 'Momento de Oração',
        b: 'Agradeça pelo cuidado de Deus, apresente suas necessidades e busque a paz em Cristo.'
      },
      ler: {
        l: 'Leitura',
        h: 'Leitura Bíblica',
        b: `Leia atentamente a passagem de ${versiculo.referencia}.`
      },
      meditar: {
        l: 'Meditação',
        h: 'Meditar na Palavra',
        b: 'Permita que a Palavra de Deus encontre morada em seu coração.'
      },
      orar: {
        l: 'Oração',
        h: 'Orar com Confiança',
        b: 'Apresente suas petições e ações de graças ao Pai celeste.'
      },
      descansar: {
        l: 'Silêncio',
        h: 'Silêncio Devocional',
        b: 'Aquiete a alma e descanse na presença do Senhor.',
        timer: 1
      }
    }
  };
}

const MODES = {
  rapido: {
    n: 'Rápido',
    t: '5 min',
    d: 'Leitura bíblica e oração.',
    s: ['palavra', 'oracao']
  },
  padrao: {
    n: 'Padrão',
    t: '15 min',
    d: 'Leitura, meditação, autoexame e oração.',
    s: ['palavra', 'meditacao', 'exame', 'oracao']
  },
  aprofundado: {
    n: 'Aprofundado',
    t: '20 min',
    d: 'Leitura, meditação na Palavra, oração e silêncio diante de Deus.',
    s: ['ler', 'meditar', 'orar', 'descansar']
  }
};

const VERSOES_BIBLIA = [
  ['NAA', 'NAA (Nova Almeida Atualizada)'],
  ['ARA', 'ARA (Almeida Revista e Atualizada)'],
  ['NVI-PT', 'NVI (Nova Versão Internacional)'],
  ['ARC', 'ARC (Almeida Revista e Corrigida)']
];

/**
 * Lista pré-definida de versículos bíblicos para o Versículo do Dia (Cânon Protestante)
 */
const VERSICULOS_DO_DIA = [
  {
    texto: '«Alegrem-se sempre no Senhor; outra vez digo: alegrem-se!»',
    referencia: 'Filipenses 4:4',
    tema: 'Alegria e Paz'
  },
  {
    texto: '«O Senhor é o meu pastor; nada me faltará. Ele me faz repousar em verdes pastos e me guia mansamente a águas tranquilas.»',
    referencia: 'Salmo 23:1-2',
    tema: 'Provisão e Descanso'
  },
  {
    texto: '«Mas os que esperam no Senhor renovam as suas forças, sobem com asas como águias, correm e não se cansam, caminham e não se fatigam.»',
    referencia: 'Isaías 40:31',
    tema: 'Renovação e Força'
  },
  {
    texto: '«Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.»',
    referencia: 'João 3:16',
    tema: 'Graça e Salvação'
  },
  {
    texto: '«Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.»',
    referencia: 'Romanos 8:28',
    tema: 'Soberania e Esperança'
  },
  {
    texto: '«Confie no Senhor de todo o seu coração e não se apoie no seu próprio entendimento. Reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.»',
    referencia: 'Provérbios 3:5-6',
    tema: 'Direção Divina'
  },
  {
    texto: '«As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã. Grande é a tua fidelidade!»',
    referencia: 'Lamentações 3:22-23',
    tema: 'Fidelidade de Deus'
  },
  {
    texto: '«Não tema, porque eu sou com você; não se assuste, porque eu sou o seu Deus; eu o fortaleço, ajudo e sustento com a destra da minha justiça.»',
    referencia: 'Isaías 41:10',
    tema: 'Presença e Proteção'
  },
  {
    texto: '«Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso.»',
    referencia: 'Mateus 11:28',
    tema: 'Descanso em Cristo'
  },
  {
    texto: '«Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações.»',
    referencia: 'Salmo 46:1',
    tema: 'Refúgio e Fortaleza'
  },
  {
    texto: '«Porque pela graça vocês são salvos, mediante a fé; e isto não vem de vocês, é dom de Deus; não de obras, para que ninguém se glorie.»',
    referencia: 'Efésios 2:8-9',
    tema: 'Salvação pela Graça'
  },
  {
    texto: '«Não foi isso que eu ordenei? Seja forte e corajoso! Não fique desanimado nem tenha medo, porque o Senhor, seu Deus, estará com você por onde quer que você andar.»',
    referencia: 'Josué 1:9',
    tema: 'Coragem e Fé'
  },
  {
    texto: '«Lancem sobre ele toda a sua ansiedade, porque ele cuida de vocês.»',
    referencia: '1 Pedro 5:7',
    tema: 'Cuidado Paternal'
  },
  {
    texto: '«A minha graça é tudo o que você precisa, pois o meu poder se aperfeiçoa na fraqueza.»',
    referencia: '2 Coríntios 12:9',
    tema: 'Suficiência da Graça'
  },
  {
    texto: '«Lâmpada para os meus pés é a tua palavra e luz, para o meu caminho.»',
    referencia: 'Salmo 119:105',
    tema: 'A Palavra de Deus'
  }
];

/**
 * Retorna o Versículo do Dia determinístico a partir da data de hoje ou especificada.
 * @param {Date} [dataRef] Data de referência opcional.
 * @returns {Object} Versículo { texto, referencia, tema }
 */
function obterVersiculoDoDia(dataRef) {
  if (!VERSICULOS_DO_DIA || !VERSICULOS_DO_DIA.length) {
    return {
      texto: '«Alegrem-se sempre no Senhor; outra vez digo: alegrem-se!»',
      referencia: 'Filipenses 4:4',
      tema: 'Alegria e Paz'
    };
  }

  const data = dataRef instanceof Date ? dataRef : new Date();
  const inicioAno = new Date(data.getFullYear(), 0, 0);
  const diff = data - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  const indice = Math.abs((diaDoAno + data.getFullYear()) % VERSICULOS_DO_DIA.length);
  return VERSICULOS_DO_DIA[indice];
}

