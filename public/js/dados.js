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
        texto: `Quando o povo viu que Moisés demorava a descer do monte, reuniu-se ao redor de Arão e lhe disse: "Levante-se, faça para nós deuses que vão adiante de nós; porque, quanto a este Moisés, o homem que nos tirou da terra do Egito, não sabemos o que lhe aconteceu."

Arão lhes disse: "Tirem as argolas de ouro das orelhas de suas mulheres, de seus filhos e de suas filhas e tragam para mim." Então todo o povo tirou as argolas de ouro que usava nas orelhas e as trouxe a Arão. Ele as recebeu das mãos deles, trabalhou o ouro com uma ferramenta de entalhe e fez um bezerro fundido. Então disseram: "Estes são os seus deuses, ó Israel, que o tiraram da terra do Egito!"

Vendo isto, Arão construiu um altar diante do bezerro e proclamou: "Amanhã será festa ao Senhor." No dia seguinte, madrugaram, ofereceram holocaustos e trouxeram sacrifícios de paz. E o povo assentou-se para comer e beber; depois, levantou-se para se divertir.

Então o Senhor disse a Moisés: "Vá, desça, porque o seu povo, que você tirou da terra do Egito, se corrompeu. Depressa se desviaram do caminho que lhes havia ordenado; fizeram para si um bezerro fundido, prostraram-se diante dele, ofereceram-lhe sacrifícios e disseram: 'Estes são os seus deuses, ó Israel, que o tiraram da terra do Egito!'"

O Senhor disse mais a Moisés: "Tenho visto este povo, e eis que é povo de dura cerviz. Agora, pois, deixe-me, para que o meu furor se acenda contra eles e eu os destrua; e de você farei uma grande nação."

Moisés, porém, suplicou ao Senhor, seu Deus, dizendo: "Por que, ó Senhor, se acende o teu furor contra o teu povo, que tiraste da terra do Egito com grande poder e com mão poderosa? Por que hão de dizer os egípcios: 'Com maus propósitos ele os tirou, para matá-los nos montes e para varrê-los da face da terra'? Deixa o furor da tua ira e arrepende-te deste mal contra o teu povo. Lembra-te de Abraão, de Isaque e de Israel, teus servos, aos quais por ti mesmo juraste, dizendo: 'Multiplicarei a vossa descendência como as estrelas do céu e darei toda esta terra de que falei à vossa descendência, para que a possua para sempre.'"

Então o Senhor desistiu do mal que tinha dito que faria ao seu povo.`
      },
      {
        tipo: 'Salmo',
        ref: 'Salmo 106:1–6, 19–23',
        resumo: 'Confissão da infidelidade do povo e louvor pela misericórdia de Deus.',
        texto: `Aleluia! Deem graças ao Senhor, porque ele é bom,
porque a sua misericórdia dura para sempre.
Quem pode contar as poderosas obras do Senhor
ou anunciar todos os seus louvores?

Bem-aventurados os que guardam a retidão
e praticam a justiça em todo o tempo!
Lembra-te de mim, Senhor, segundo a tua bondade para com o teu povo;
visita-me com a tua salvação,
para que eu veja a prosperidade dos teus escolhidos,
me alegre com a alegria do teu povo
e me glorie com a tua herança.

Pecamos, como os nossos pais;
cometemos iniquidade, andamos perversamente.

Fizeram um bezerro em Horebe
e adoraram uma imagem fundida.
E assim trocaram a glória de Deus
pela figura de um boi que come capim.
Esqueceram-se de Deus, seu Salvador,
que fizera coisas grandiosas no Egito,
maravilhas na terra de Cam,
feitos tremendos no mar Vermelho.

Tê-los-ia destruído, como dissera,
se Moisés, seu escolhido, não se tivesse interposto diante dele,
para desviar a sua ira, a fim de que não os destruísse.`
      },
      {
        tipo: 'Epístola',
        ref: 'Filipenses 4:1–9',
        resumo: 'A exortação à alegria, à oração com ação de graças e à paz de Deus.',
        texto: `Portanto, meus amados e saudosos irmãos, minha alegria e coroa, permaneçam assim firmes no Senhor, amados.

Rogo a Evódia e rogo a Síntique que pensem concordemente no Senhor. Sim, peço também a você, fiel companheiro de jugo, que ajude essas mulheres, pois elas trabalharam comigo no evangelho, juntamente com Clemente e com os demais cooperadores meus, cujos nomes estão no Livro da Vida.

Alegrem-se sempre no Senhor; outra vez digo: alegrem-se! Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor.

Não andem ansiosos por coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.

Finalmente, irmãos, tudo o que é verdadeiro, tudo o que é respeitável, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se alguma virtude há e se algum louvor existe, seja isso o que ocupe o pensamento de vocês. O que também aprenderam, receberam, ouviram e viram em mim, isso pratiquem; e o Deus da paz estará com vocês.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Mateus 22:1–14',
        resumo: 'A parábola da festa de casamento do filho do Rei.',
        texto: `Jesus voltou a falar-lhes por parábolas, dizendo:

"O Reino dos Céus é semelhante a um rei que preparou uma festa de casamento para o seu filho. Ele enviou os seus servos a chamar os convidados para as bodas, mas estes não quiseram vir.

Enviou ainda outros servos com esta ordem: 'Digam aos convidados: Eis que já preparei o meu banquete; os meus bois e cevados já foram abatidos, e tudo está pronto; venham para as bodas!'

Eles, porém, não se importaram e foram, um para o seu campo, outro para o seu comércio; e os outros, agarrando os servos, os maltrataram e mataram. O rei ficou irado e, enviando as suas tropas, destruiu aqueles assassinos e incendiou a cidade deles.

Então disse aos servos: 'O banquete está preparado, mas os convidados não eram dignos. Vão, pois, para as encruzilhadas dos caminhos e convidem para as bodas todos os que encontrarem.' E, saindo aqueles servos pelos caminhos, reuniram todos os que encontraram, tanto maus como bons; e a sala do banquete ficou cheia de convidados.

Quando o rei entrou para ver os que estavam à mesa, notou ali um homem que não estava usando veste nupcial e lhe perguntou: 'Amigo, como você entrou aqui sem veste nupcial?' O homem emudeceu. Então o rei ordenou aos serventes: 'Amarrem-no de pés e mãos e lancem-no nas trevas exteriores; ali haverá choro e ranger de dentes.'

Porque muitos são chamados, mas poucos, escolhidos."`
      }
    ],
    passos: {
      palavra: {
        l: 'Palavra',
        h: 'Mateus 22:1–14',
        b: 'Abra sua Bíblia neste trecho e leia devagar, com reverência. Sublinhe mentalmente o versículo que mais falar ao seu coração.'
      },
      meditacao: {
        l: 'Meditação',
        h: 'O convite do Rei',
        b: 'A festa da graça de Deus já está preparada em Cristo. A parábola nos confronta: como temos respondido ao chamado de Deus — com desculpas, com indiferença ou com gratidão e fé?'
      },
      exame: {
        l: 'Autoexame',
        h: 'Onde tenho resistido ao convite de Deus?',
        b: 'Examine o seu coração à luz das Escrituras (2 Coríntios 13:5): onde você precisa se arrepender e renovar sua dependência da graça de Cristo?',
        q: 1
      },
      oracao: {
        l: 'Oração',
        h: 'Responda a Deus',
        b: 'Agradeça a Deus pelo dom de Cristo, confesse as suas fraquezas e peça ao Espírito Santo que renove a sua disposição de servi-Lo com alegria.'
      },
      ler: {
        l: 'Leitura',
        h: 'Ler a Palavra',
        b: 'Leia Mateus 22:1–14 duas vezes, calmamente. Deixe a verdade bíblica penetrar no seu entendimento.'
      },
      meditar: {
        l: 'Meditação',
        h: 'Meditar nas Escrituras',
        b: 'Reflita sobre o que o texto revela sobre o caráter de Deus, a salvação pela graça e a sua vida prática.'
      },
      orar: {
        l: 'Oração',
        h: 'Orar em Nome de Jesus',
        b: 'Converse com o Pai celeste sobre o que as Escrituras despertaram em você: louvor, gratidão, confissão e pedidos.'
      },
      descansar: {
        l: 'Silêncio',
        h: 'Descansar no Senhor',
        b: '«Aquietai-vos e sabei que eu sou Deus» (Salmo 46:10). Descanse na suficiência da graça soberana de Deus.',
        timer: 1
      }
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
      {
        tipo: 'Primeira Leitura',
        ref: 'Êxodo 24:1–8',
        resumo: 'A aliança no Sinai e a fidelidade à Palavra de Deus.',
        texto: `Depois o Senhor disse a Moisés: "Subam ao Senhor, você e Arão, Nadabe e Abiú, e setenta dos anciãos de Israel; e adorem de longe. Só Moisés se aproximará do Senhor; os outros não se aproximarão, nem o povo subirá com ele."

Moisés veio e referiu ao povo todas as palavras do Senhor e todos os estatutos. Então todo o povo respondeu a uma voz e disse: "Faremos todas as palavras que o Senhor tem falado." Moisés escreveu todas as palavras do Senhor.

Ele se levantou de manhã cedo, edificou um altar ao pé do monte e doze colunas, segundo as doze tribos de Israel. E enviou alguns jovens dos filhos de Israel, os quais ofereceram holocaustos e sacrificaram ao Senhor novilhos como ofertas de paz.

Moisés tomou a metade do sangue e o pôs em bacias; e a outra metade do sangue aspergiu sobre o altar. E tomou o Livro da Aliança e o leu diante do povo. E eles disseram: "Tudo o que o Senhor falou faremos e obedeceremos."

Então Moisés tomou aquele sangue, e o aspergiu sobre o povo, e disse: "Eis aqui o sangue da aliança que o Senhor fez com vocês a respeito de todas estas palavras."`
      },
      {
        tipo: 'Salmo',
        ref: 'Salmo 106:1–6',
        resumo: 'Louvor ao Senhor pela sua fidelidade eterna.',
        texto: `Aleluia! Deem graças ao Senhor, porque ele é bom,
porque a sua misericórdia dura para sempre.
Quem pode contar as poderosas obras do Senhor
ou anunciar todos os seus louvores?

Bem-aventurados os que guardam a retidão
e praticam a justiça em todo o tempo!
Lembra-te de mim, Senhor, segundo a tua bondade para com o teu povo;
visita-me com a tua salvação!`
      },
      {
        tipo: 'Epístola',
        ref: '1 Pedro 5:1–7',
        resumo: 'A exortação à humildade e o cuidado paternal de Deus.',
        texto: `Aos presbíteros que estão entre vocês, exorto eu, que sou também presbítero com eles, testemunha dos sofrimentos de Cristo e participante da glória que há de ser revelada: pastoreiem o rebanho de Deus que está sob o cuidado de vocês, não por obrigação, mas de livre vontade, como Deus quer; não por ganância, mas com dedicação; não como dominadores dos que lhes foram confiados, mas servindo de exemplo ao rebanho.

E, quando se manifestar o Supremo Pastor, vocês receberão a coroa da glória, que nunca murcha.

Da mesma forma, vocês, jovens, sejam submissos aos que são mais velhos. Sejam todos compassivos uns para com os outros, vestindo-se de humildade, porque "Deus se opõe aos orgulhosos, mas concede graça aos humildes".

Humilhem-se, portanto, sob a poderosa mão de Deus, para que ele, em tempo oportuno, os exalte, lançando sobre ele toda a sua ansiedade, porque ele cuida de vocês.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Mateus 22:15–22',
        resumo: 'Dai a César o que é de César, e a Deus o que é de Deus.',
        texto: `Então os fariseus se retiraram e consultaram entre si como apanhariam Jesus em alguma palavra. E enviaram-lhe discípulos seus, juntamente com os herodianos, para dizer: "Mestre, sabemos que o senhor é verdadeiro e que ensina o caminho de Deus segundo a verdade, sem se importar com quem quer que seja, porque não olha para a aparência das pessoas. Diga-nos, pois, o que lhe parece: É lícito pagar tributo a César ou não?"

Jesus, porém, conhecendo a malícia deles, respondeu: "Por que vocês me põem à prova, hipócritas? Mostrem-me a moeda do tributo." Eles lhe apresentaram um denário. E Jesus lhes perguntou: "De quem é esta imagem e a inscrição?"

Eles responderam: "De César." Então Jesus lhes disse: "Dêem, pois, a César o que é de César e a Deus o que é de Deus."

Ao ouvirem isso, ficaram maravilhados e, deixando-o, foram embora.`
      }
    ],
    passos: {
      palavra: {
        l: 'Palavra',
        h: '1 Pedro 5:1–7',
        b: 'Leia o texto bíblico com atenção. Deixe que a promessa do cuidado de Deus ressoe no seu coração.'
      },
      meditacao: {
        l: 'Meditação',
        h: 'Lançando toda ansiedade',
        b: 'Deus não quer que carreguemos sozinhos os fardos do dia. Ele nos convida a confiar plenamente em Seu poder e bondade paternal.'
      },
      exame: {
        l: 'Autoexame',
        h: 'Quais ansiedades preciso entregar a Deus hoje?',
        b: 'Examine o seu coração diante de Deus: em quais áreas você tem tentado controlar as circunstâncias pela própria força em vez de confiar no Senhor?',
        q: 1
      },
      oracao: {
        l: 'Oração',
        h: 'Entrega e Confiança',
        b: 'Em oração, lance sobre Cristo todas as suas ansiedades e descanse na certeza de que Ele cuida de você.'
      },
      ler: {
        l: 'Leitura',
        h: 'Ler a Palavra',
        b: 'Leia 1 Pedro 5:5–7 duas vezes calmamente.'
      },
      meditar: {
        l: 'Meditação',
        h: 'Meditar na Promessa',
        b: 'O que significa para você a verdade bíblica de que "Ele cuida de vocês" hoje?'
      },
      orar: {
        l: 'Oração',
        h: 'Clamor em Oração',
        b: 'Fale com Deus com sinceridade, entregando suas lutas e agradecendo pelo Seu cuidado.'
      },
      descansar: {
        l: 'Silêncio',
        h: 'Descansar no Senhor',
        b: 'Repouse no amor do Bom Pastor. («O Senhor é a minha rocha e o meu refúgio» — Salmo 18:2).',
        timer: 1
      }
    }
  }
];

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

