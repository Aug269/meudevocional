/**
 * MEU DEVOCIONAL - DADOS
 * Conteúdos litúrgicos, bíblicos, orações e exame de consciência
 */

const DADOS_LITURGIA = {
  cores: {
    verde: { hex: '#3F8F5B', nome: 'Verde', significado: 'Tempo Comum - Esperança e vida espiritual' },
    roxo: { hex: '#7E4A9E', nome: 'Roxo', significado: 'Advento / Quaresma - Penitência e reflexão' },
    branco: { hex: '#B59438', nome: 'Branco / Dourado', significado: 'Páscoa / Natal - Alegria e glória' },
    vermelho: { hex: '#B83A3A', nome: 'Vermelho', significado: 'Pentecostes / Mártires - Amor e Espírito Santo' }
  }
};

const DEVOCIONAIS = [
  {
    id: 'dev-1',
    data: 'Hoje',
    tempoLiturgico: 'Tempo Comum',
    corLiturgica: '#3F8F5B',
    semanaLiturgica: 'XXVII Semana do Tempo Comum',
    titulo: 'Permanecer na Videira Verdadeira',
    subtitulo: 'A intimidade diária com Deus é a fonte de toda fecundidade espiritual',
    versiculoDestaque: {
      texto: '«Eu sou a videira, vós as varas; quem está em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.»',
      referencia: 'João 15:5'
    },
    primeiraLeitura: {
      label: 'Primeira Leitura',
      ref: 'Gálatas 5:22-26',
      texto: `Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, autodomínio. Contra estas coisas não há lei.
      
E os que são de Cristo Jesus crucificaram a carne com as suas paixões e concupiscências. Se vivemos pelo Espírito, andemos também pelo Espírito. Não nos tornemos vaidosos, provocando-nos uns aos outros, invejando-nos uns aos outros.`
    },
    salmo: {
      label: 'Salmo Responsorial',
      ref: 'Salmo 1',
      refrao: 'R. Feliz aquele que põe sua esperança no Senhor!',
      texto: `Feliz o homem que não anda conforme o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores.
      
Antes tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite.
      
Ele é como a árvore plantada junto a correntes de águas, que dá o seu fruto na estação própria, e cuja folha não cai; e tudo quanto fizer prosperará.`
    },
    evangelho: {
      label: 'Evangelho',
      ref: 'João 15:1-8',
      texto: `Naquele tempo, disse Jesus aos seus discípulos:
      
«Eu sou a videira verdadeira, e meu Pai é o agricultor. Todo ramo que em mim não dá fruto, ele o corta; e todo ramo que dá fruto, ele o limpa, para que dê mais fruto ainda. Vós já estais limpos, pela palavra que vos tenho falado.
      
Permanecei em mim, e eu permanecerei em vós. Como o ramo não pode dar fruto por si mesmo, se não permanecer na videira, assim também vós não podeis, se não permanecerdes em mim.
      
Eu sou a videira, vós as varas; quem está em mim, e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer. Nisto é glorificado meu Pai, em que deis muito fruto; e assim sereis meus discípulos.»`
    },
    reflexao: {
      autor: 'Meditação Espiritual',
      texto: `Na correria dos dias modernos, é tentador medir nosso valor pela quantidade de tarefas concluídas ou pelo ritmo agitado da nossa rotina. Contudo, Jesus nos lembra de uma verdade libertadora: a verdadeira vida nasce do repouso n’Ele.
      
Estar unido à videira não significa passividade, mas sintonia de coração. Significa começar o dia entregando as preocupações, tomar decisões à luz da Sua Palavra e manter o coração sereno nas tribulações. Quando permanecemos em Deus, os frutos do Espírito — a paz, a alegria e a paciência — florescem naturalmente ao nosso redor.`,
      perguntaReflexao: 'O que tem drenado sua paz hoje? Onde você precisa reaprender a permanecer com Cristo?'
    },
    aplicacaoPratica: 'Reserve hoje 5 minutos de silêncio absoluto. Entregue a Deus uma decisão ou ansiedade que tem pesado em seus ombros.',
    oracaoDoDia: 'Senhor Jesus, és a videira verdadeira e a fonte da minha vida. Reconheço que sem Ti nada posso fazer de duradouro. Guarda o meu coração junto ao Teu, podando tudo o que me afasta do Teu amor. Que hoje eu possa transbordar Tua bondade, paz e mansidão para com todos ao meu redor. Amém.'
  },
  {
    id: 'dev-2',
    data: 'Amanhã',
    tempoLiturgico: 'Tempo Comum',
    corLiturgica: '#3F8F5B',
    semanaLiturgica: 'Tempo de Esperança e Renovação',
    titulo: 'A Paz que Excede Todo Entendimento',
    subtitulo: 'Como desarmar a ansiedade através da oração confiante',
    versiculoDestaque: {
      texto: '«Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.»',
      referencia: 'Filipenses 4:6'
    },
    primeiraLeitura: {
      label: 'Primeira Leitura',
      ref: 'Filipenses 4:4-9',
      texto: `Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos. Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor.
      
Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.`
    },
    salmo: {
      label: 'Salmo Responsorial',
      ref: 'Salmo 23',
      refrao: 'R. O Senhor é o meu pastor, nada me faltará.',
      texto: `O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.
      
Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome. Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.`
    },
    evangelho: {
      label: 'Evangelho',
      ref: 'Mateus 6:25-34',
      texto: `Por isso vos digo: Não andeis ansiosos pela vossa vida, quanto ao que haveis de comer ou beber; nem pelo vosso corpo, quanto ao que haveis de vestir. Não é a vida mais do que o alimento, e o corpo mais do que as vestes?
      
Olhai para as aves do céu, que não semeiam, nem segam, nem ajuntam em celeiros; e vosso Pai celestial as alimenta. Não tendes vós muito mais valor do que elas? Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.`
    },
    reflexao: {
      autor: 'Meditação Espiritual',
      texto: `A ansiedade tenta nos convencer de que estamos sozinhos diante do futuro incerto. São Paulo nos dá o antídoto seguro: transformar cada preocupação em oração com gratidão.
      
Agradecer antes mesmo de ver a resposta é o ato mais puro de fé. Quando confiamos que o Pai cuida até dos lírios do campo, o nosso coração encontra repouso na promessa eterna do Seu amor.`,
      perguntaReflexao: 'Quais preocupações do futuro você pode transferir agora mesmo para as mãos de Deus?'
    },
    aplicacaoPratica: 'Escreva um motivo sincero de gratidão por algo simples que Deus lhe concedeu esta semana.',
    oracaoDoDia: 'Pai bondoso, Tu conheces cada batimento do meu coração e cada necessidade da minha alma. Renuncio hoje à ansiedade e acolho a Tua paz. Ajuda-me a confiar no Teu cuidado paterno a cada instante do dia de hoje. Amém.'
  }
];

const EXAME_PASSOS = [
  {
    id: 1,
    etapa: '1. Ação de Graças',
    titulo: 'Reconhecer as Bênçãos',
    instrucao: 'Agradeça a Deus pelos dons e momentos luminosos concedidos no decorrer do dia de hoje.',
    perguntas: [
      { id: 'ex_1', texto: 'Agradeci a Deus pelo dom da vida e pelas pessoas que me apoiaram hoje?' },
      { id: 'ex_2', texto: 'Reconheci a presença amorosa de Deus nos pequenos detalhes do dia?' }
    ]
  },
  {
    id: 2,
    etapa: '2. Pedir a Luz Divina',
    titulo: 'Pedir Discernimento',
    instrucao: 'Invoque o Espírito Santo para enxergar sua conduta com verdade, sem autoengano nem condenação.',
    perguntas: [
      { id: 'ex_3', texto: 'Pedi a luz do Espírito Santo antes de tomar decisões importantes?' }
    ]
  },
  {
    id: 3,
    etapa: '3. Revisão do Dia',
    titulo: 'Pensamentos, Palavras e Ações',
    instrucao: 'Passe em revista o dia: desde a manhã até a noite. Onde você amou? Onde faltou a caridade?',
    perguntas: [
      { id: 'ex_4', texto: 'Fui paciente e gentil com as pessoas em casa ou no trabalho?' },
      { id: 'ex_5', texto: 'Evitei fofocas, murmurações, julgamentos e palavras duras?' },
      { id: 'ex_6', texto: 'Dediquei tempo sincero para conversar com Deus em oração?' },
      { id: 'ex_7', texto: 'Cumpri minhas obrigações com honestidade, diligência e justiça?' },
      { id: 'ex_8', texto: 'Estive atento às necessidades dos mais vulneráveis ou de quem precisava de apoio?' }
    ]
  },
  {
    id: 4,
    etapa: '4. Pedido de Perdão',
    titulo: 'Misericórdia e Reconciliação',
    instrucao: 'Apresente suas fraquezas ao Coração Misericordioso de Jesus, com sincero arrependimento.',
    perguntas: [
      { id: 'ex_9', texto: 'Peço perdão pelas faltas cometidas e perdoo de coração a quem me ofendeu?' }
    ]
  },
  {
    id: 5,
    etapa: '5. Propósito de Emenda',
    titulo: 'Olhar para o Amanhã',
    instrucao: 'Renove a confiança na graça divina e estabeleça um propósito concreto para o dia seguinte.',
    perguntas: [
      { id: 'ex_10', texto: 'Tenho a firme intenção de recomeçar amanhã com mais fidelidade e caridade?' }
    ]
  }
];

const ORACOES = [
  {
    id: 'or-1',
    categoria: 'manhã',
    titulo: 'Oração da Manhã',
    autor: 'Tradição da Igreja',
    texto: `Senhor, no silêncio deste dia que amanhece, venho pedir-Te a paz, a sabedoria e a força.
    
Quero olhar hoje o mundo com olhos cheios de amor, ser paciente, compreensivo, manso e prudente.
    
Quero ver, além das aparências, Teus filhos como Tu mesmo os vês, e assim não ver senão o bem em cada um.
    
Cerra meus ouvidos a toda calúnia. Guarda minha língua de toda maldade. Que só de bênçãos se encha meu espírito.
    
Que eu seja tão bondoso e alegre que todos quantos se aproximarem de mim sintam a Tua presença.
    
Reveste-me de Tua beleza, Senhor, e que, no decurso deste dia, eu Te revele a todos. Amém.`
  },
  {
    id: 'or-2',
    categoria: 'noite',
    titulo: 'Oração da Noite (Completas)',
    autor: 'Liturgia das Horas',
    texto: `O Senhor todo-poderoso nos conceda uma noite tranquila e um fim perfeito.
    
Em Vossas mãos, Senhor, entrego o meu espírito. Vós nos redimistes, Senhor, Deus da verdade.
    
Guardai-nos, Senhor, como a pupila dos Vossos olhos; protegei-nos à sombra de Vossas asas.
    
Salvai-nos, Senhor, quando velamos; guardai-nos quando dormimos, para que velemos com Cristo e descansemos em paz. Amém.`
  },
  {
    id: 'or-3',
    categoria: 'classicas',
    titulo: 'Pai Nosso',
    autor: 'Oração ensinada por Jesus',
    texto: `Pai Nosso que estais nos Céus, santificado seja o Vosso nome.
Venha a nós o Vosso Reino. Seja feita a Vossa vontade, assim na terra como no céu.
O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido.
E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.`
  },
  {
    id: 'or-4',
    categoria: 'classicas',
    titulo: 'Ave Maria',
    autor: 'Tradição Bíblica e Eclesial',
    texto: `Ave Maria, cheia de graça, o Senhor é convosco.
Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.`
  },
  {
    id: 'or-5',
    categoria: 'classicas',
    titulo: 'Ato de Contrição',
    autor: 'Oração de Penitência',
    texto: `Meu Deus, eu me arrependo de todo o coração de Vos ter ofendido, porque sois tão bom e amável.
Prometo com a Vossa graça não mais pecar e evitar as ocasiões próximas de pecado.
Senhor, tende compaixão de mim! Amém.`
  },
  {
    id: 'or-6',
    categoria: 'classicas',
    titulo: 'Oração de São Francisco',
    autor: 'São Francisco de Assis',
    texto: `Senhor, fazei-me instrumento de vossa paz.
Onde houver ódio, que eu leve o amor;
Onde houver ofensa, que eu leve o perdão;
Onde houver discórdia, que eu leve a união;
Onde houver dúvida, que eu leve a fé;
Onde houver erro, que eu leve a verdade;
Onde houver desespero, que eu leve a esperança;
Onde houver tristeza, que eu leve a alegria;
Onde houver trevas, que eu leve a luz.

Ó Mestre, fazei que eu procure mais consolar que ser consolado;
compreender, que ser compreendido;
amar, que ser amado.
Pois é dando que se recebe,
é perdoando que se é perdoado,
e é morrendo que se vive para a vida eterna. Amém.`
  },
  {
    id: 'or-7',
    categoria: 'classicas',
    titulo: 'Salve Rainha',
    autor: 'Tradição Mariana',
    texto: `Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!
A vós bradamos, os degredados filhos de Eva.
A vós suspiramos, gemendo e chorando neste vale de lágrimas.
Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei.
E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre.
Ó clemente, ó piedosa, ó doce sempre Virgem Maria!
Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.`
  }
];

const TIMER_PRESETS = [
  { minutos: 1, label: '1 min', descricao: 'Pausa rápida de recolhimento' },
  { minutos: 3, label: '3 min', descricao: 'Respiração e presença de Deus' },
  { minutos: 5, label: '5 min', descricao: 'Silêncio meditativo diário' },
  { minutos: 10, label: '10 min', descricao: 'Contemplação profunda' },
  { minutos: 15, label: '15 min', descricao: 'Oração prolongada' }
];
