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
        texto: `Aleluia! Deem graças ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.
Quem pode contar as poderosas obras do Senhor ou anunciar todos os seus louvores?
Bem-aventurados os que guardam a retidão e praticam a justiça em todo o tempo!
Lembra-te de mim, Senhor, segundo a tua bondade para com o teu povo; visita-me com a tua salvação, para que eu veja a prosperidade dos teus escolhidos, me alegre com a alegria do teu povo e me glorie com a tua herança.
Pecamos, como os nossos pais; cometemos iniquidade, andamos perversamente.

Fizeram um bezerro em Horebe e adoraram uma imagem fundida.
E assim trocaram a glória de Deus pela figura de um boi que come capim.
Esqueceram-se de Deus, seu Salvador, que fizera coisas grandiosas no Egito, maravilhas na terra de Cam, feitos tremendos no mar Vermelho.
Tê-los-ia destruído, como dissera, se Moisés, seu escolhido, não se tivesse interposto diante dele, para desviar a sua ira, a fim de que não os destruísse.`
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
      {
        tipo: 'Salmo',
        ref: 'Salmo 119:105-112',
        resumo: 'A Palavra como lâmpada e luz cotidiana.',
        texto: `105. Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.
106. Jurei, e o cumprirei, que guardarei os teus justos juízos.
107. Estou aflitíssimo; vivifica-me, ó Senhor, segundo a tua palavra.
108. Aceita, eu te rogo, as oferendas voluntárias da minha boca, ó Senhor; e ensina-me os teus juízos.
109. A minha alma está continuamente na minha mão; todavia não me esqueço da tua lei.
110. Os ímpios me armaram laço; contudo não me desviei dos teus preceitos.
111. Os teus testemunhos tomei por herança para sempre, pois são o gozo do meu coração.
112. Inclinei o meu coração a cumprir os teus estatutos, para sempre, até ao fim.`
      },
      {
        tipo: 'Antigo Testamento',
        ref: 'Provérbios 3:1-8',
        resumo: 'Confiança e sabedoria no Senhor.',
        texto: `1. Filho meu, não te esqueças da minha lei, e o teu coração guarde os meus mandamentos.
2. Porque eles aumentarão os teus dias e te acrescentarão anos de vida e paz.
3. Não te desamparem a benignidade e a fidelidade; ata-as ao teu pescoço; escreve-as na tábua do teu coração.
4. E acharás graça e bom entendimento aos olhos de Deus e do homem.
5. Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.
6. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.
7. Não sejas sábio aos teus próprios olhos; teme ao Senhor e aparta-te do mal.
8. Isto será saúde para o teu corpo e refrigério para os teus ossos.`
      },
      {
        tipo: 'Evangelho',
        ref: 'João 8:12-20',
        resumo: 'Jesus, a Luz do Mundo.',
        texto: `12. Falou-lhes, pois, Jesus outra vez, dizendo: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.
13. Disseram-lhe, pois, os fariseus: Tu testificas de ti mesmo; o teu testemunho não é verdadeiro.
14. Respondeu Jesus, e disse-lhes: Ainda que eu testifico de mim mesmo, o meu testemunho é verdadeiro, porque sei de onde vim, e para onde vou; mas vós não sabeis de onde venho, nem para onde vou.
15. Vós julgais segundo a carne; eu a ninguém julgo.
16. E, se na verdade julgo, o meu juízo é verdadeiro, porque não sou eu só, mas eu e o Pai que me enviou.
17. E na vossa lei está também escrito que o testemunho de dois homens é verdadeiro.
18. Eu sou o que testifico de mim mesmo, e de mim testifica também o Pai que me enviou.
19. Disseram-lhe, pois: Onde está teu Pai? Jesus respondeu: Não me conheceis a mim, nem a meu Pai; se vós me conhecêsseis a mim, também conheceríeis a meu Pai.
20. Estas palavras disse Jesus no lugar do tesouro, ensinando no templo; e ninguém o prendeu, porque ainda não era chegada a sua hora.`
      }
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
      {
        tipo: 'Salmo',
        ref: 'Salmo 46:1-11',
        resumo: 'Deus, refúgio inabalável de Seu povo.',
        texto: `1. Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.
2. Portanto não temeremos, ainda que a terra se mude, e ainda que os montes se transportem para o meio dos mares.
3. Ainda que as águas rugam e se perturbem, ainda que os montes se abalem pela sua soberba.
4. Há um rio cujas correntes megram a cidade de Deus, o santuário das moradas do Altíssimo.
5. Deus está no meio dela; não será abalada. Deus a ajudará, já ao romper da manhã.
6. As nações se bramaram, os reinos se moveram; ele levantou a sua voz, e a terra se derreteu.
7. O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio.
8. Vinde, contemplai as obras do Senhor; que desolações tem feito na terra!
9. Ele faz cessar as guerras até ao fim da terra; quebra o arco e corta a lança; queima os carros no fogo.
10. Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.
11. O Senhor dos Exércitos está conosco; o Deus de Jacó é o nosso refúgio.`
      },
      {
        tipo: 'Epístola',
        ref: '2 Coríntios 4:7-18',
        resumo: 'Tesouro em vasos de barro.',
        texto: `7. Temos, porém, este tesouro em vasos de barro, para que a excelência do poder seja de Deus, e não de nós.
8. Em tudo somos atribulados, mas não angustiados; perplexos, mas não desanimados.
9. Perseguidos, mas não desamparados; abatidos, mas não destruídos;
10. Trazendo sempre por toda a parte a mortificação do Senhor Jesus no corpo, para que a vida de Jesus se manifeste também nos nossos corpos;
11. E assim nós, que vivemos, estamos sempre entregues à morte por amor de Jesus, para que a vida de Jesus se manifeste também na nossa carne mortal.
12. De maneira que em nós opera a morte, mas em vós a vida.
13. E temos portanto o mesmo espírito de fé, como está escrito: Cri, por isso falei; nós cremos também, por isso também falamos.
14. Sabendo que o que ressuscitou o Senhor Jesus nos ressuscitará também por Jesus, e nos apresentará convosco.
15. Porque tudo isto é por amor de vós, para que a graça, multiplicada por meio de muitos, faça abundar a ação de graças para glória de Deus.
16. Por isso não desfalecemos; mas, ainda que o nosso homem exterior se corrompa, o interior, contudo, se renova de dia em dia.
17. Porque a nossa leve e momentânea tribulação produz para nós um peso eterno de glória mui excelente;
18. Não atentando nós nas coisas que se vêem, mas nas que se não vêem; porque as que se vêem são temporárias, e as que se não vêem são eternas.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Marcos 4:35-41',
        resumo: 'Jesus acalma a tempestade.',
        texto: `35. E, naquele dia, sendo já tarde, disse-lhes: Passemos para o outro lado.
36. E eles, deixando a multidão, o levaram consigo, assim como estava, no barco; e havia também com ele outros barquinhos.
37. E levantou-se grande tempestade de vento, e subiam as ondas por cima do barco, de maneira que já se enchia.
38. E ele estava no popa, dormindo sobre uma almofada, e despertaram-no, dizendo-lhe: Mestre, não te importa que pereçamos?
39. E ele, levantando-se, repreendeu o vento, e disse ao mar: Aquieta-te, emudece. E o vento aquietou, e fez-se grande bonança.
40. E disse-lhes: Por que sois tão tímidos? Ainda não tendes fé?
41. E sentiram um grande temor, e diziam uns aos outros: Mas quem é este, que até o vento e o mar lhe obedecem?`
      }
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
      {
        tipo: 'Salmo',
        ref: 'Salmo 103:1-13',
        resumo: 'Bendize, ó minha alma, ao Senhor.',
        texto: `1. Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.
2. Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.
3. É ele quem perdoa todas as tuas iniquidades, quem sara todas as tuas enfermidades,
4. Quem resgata a tua vida da perdição; quem te coroa de benignidade e de misericórdia,
5. Quem farta a tua boca de bens, de sorte que a tua mocidade se renova como a do águia.
6. O Senhor faz justiça e juízo a todos os oprimidos.
7. Fez notórios os seus caminhos a Moisés, e os seus feitos aos filhos de Israel.
8. Misericordioso e piedoso é o Senhor; longo em irar-se e grande em benignidade.
9. Não reprovará perpetuamente, nem para sempre reterá a sua ira.
10. Não nos tratou segundo os nossos pecados, nem nos retribuiu segundo as nossas iniquidades.
11. Pois assim como o céu está elevado acima da terra, assim é grande a sua misericórdia para com os que o temem.
12. Assim como está longe o oriente do ocidente, assim afasta de nós as nossas transgressões.
13. Como um pai se compadece de seus filhos, assim o Senhor se compadece daqueles que o temem.`
      },
      {
        tipo: 'Epístola',
        ref: 'Efésios 2:1-10',
        resumo: 'Vivos juntamente com Cristo pela graça.',
        texto: `1. E vos vivificou, estando vós mortos em ofensas e pecados,
2. Em que noutro tempo andastes segundo o curso deste mundo, segundo o príncipe das potestades do ar, do espírito que agora opera nos filhos da desobediência.
3. Entre os quais todos nós também antes andávamos nos desejos da nossa carne, fazendo a vontade da carne e dos pensamentos; e éramos por natureza filhos da ira, como os outros também.
4. Mas Deus, que é richíssimo em misericórdia, pelo seu muito amor com que nos amou,
5. Estando nós ainda mortos em nossas ofensas, nos vivificou juntamente com Cristo (pela graça sois salvos),
6. E nos ressuscitou juntamente com ele e nos fez assentar nos lugares celestiais, em Cristo Jesus;
7. Para mostrar nos séculos vindouros as abundantes riquezas da sua graça pela sua benignidade para conosco em Cristo Jesus.
8. Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.
9. Não vem das obras, para que ninguém se glorie;
10. Porque somos feitura sua, criados em Cristo Jesus para as boas obras, as quais Deus preparou para que andássemos nelas.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Lucas 15:11-32',
        resumo: 'A parábola do filho pródigo e o Pai misericordioso.',
        texto: `11. E disse: Um certo homem tinha dois filhos;
12. E o mais moço deles disse ao pai: Pai, dá-me a parte dos bens que me pertence. E ele repartiu por eles a fazenda.
13. E, poucos dias depois, o filho mais moço, ajuntando tudo, partiu para uma terra distante, e ali desperdiçou os seus bens, vivendo dissolutamente.
14. E, havendo ele gasto tudo, houve naquela terra uma grande fome, e começou a padecer necessidades.
15. E foi, e chegou-se a um dos cidadãos daquela terra, o qual o mandou para os seus campos, a apascentar porcos.
16. E desejava encher o seu estômago com as bolotas que os porcos comiam, e ninguém lhe dava nada.
17. E, caindo em si, disse: Quantos trabalhadores de meu pai têm abundância de pão, e eu aqui pereço de fome!
18. Levantar-me-ei, e irei ter com meu pai, e dir-lhe-ei: Pai, pequei contra o céu e perante ti;
19. Já não sou digno de ser chamado teu filho; faze-me como um dos teus trabalhadores.
20. E, levantando-se, foi para seu pai; e, quando ainda estava longe, viu-o seu pai, e se moveu de íntima compaixão e, correndo, lançou-se-lhe ao pescoço e o beijou.
21. E o filho lhe disse: Pai, pequei contra o céu e perante ti, e já não sou digno de ser chamado teu filho.
22. Mas o pai disse aos seus servos: Trazei depressa a melhor roupa; e vesti-lho, e ponde-lhe um anel na mão, e alparcas nos pés;
23. E trazei o bezerro cevado, e matai-o; e comamos, e alegremo-nos;
24. Porque este meu filho estava morto, e reviveu, tinha-se perdido, e foi achado. E começaram a alegrar-se.`
      }
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
      {
        tipo: 'Primeira Leitura',
        ref: 'Êxodo 24:1–8',
        resumo: 'A aliança no Sinai e a fidelidade à Palavra de Deus.',
        texto: `1. Depois disse a Moisés: Sobe ao Senhor, tu e Arão, Nadabe e Abiú, e setenta dos anciãos de Israel; e adorai de longe.
2. E só Moisés se chegará ao Senhor; mas eles não se cheguem, nem o povo suba com ele.
3. Veio, pois, Moisés, e contou ao povo todas as palavras do Senhor, e todos os estatutos; então todo o povo respondeu a uma voz, e disse: Todas as palavras, que o Senhor tem falado, faremos.
4. E Moisés escreveu todas as palavras do Senhor, e levantou-se pela manhã de madrugada, e edificou um altar ao pé do monte, e doze colunas, segundo as doze tribos de Israel;
5. E enviou alguns jovens dos filhos de Israel, os quais ofereceram holocaustos e sacrificaram ao Senhor bezerros, por ofertas pacíficas.
6. E Moisés tomou a metade do sangue, e a pôs em bacias; e a outra metade do sangue aspergiu sobre o altar.
7. E tomou o livro da aliança e o leu aos ouvidos do povo, e eles disseram: Tudo o que o Senhor tem falado faremos, e obedeceremos.
8. Então tomou Moisés aquele sangue, e o aspergiu sobre o povo, e disse: Eis aqui o sangue da aliança que o Senhor tem feito convosco sobre todas estas palavras.`
      },
      {
        tipo: 'Salmo',
        ref: 'Salmo 106:1–6',
        resumo: 'Louvor ao Senhor pela sua fidelidade eterna.',
        texto: `1. Louvai ao Senhor. Louvai ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.
2. Quem pode contar as obras poderosas do Senhor? Quem anunciará todo o seu louvor?
3. Bem-aventurados os que guardam o juízo, e o que pratica a justiça em todo o tempo.
4. Lembra-te de mim, Senhor, segundo a tua boa vontade para com o teu povo; visita-me com a tua salvação;
5. Para que eu veja a prosperidade dos teus escolhidos, para que me alegre com a alegria da tua nação, e me glorie com a tua herança.
6. Nós pecamos como os nossos pais, cometemos a iniquidade, andamos perversamente.`
      },
      {
        tipo: 'Epístola',
        ref: '1 Pedro 5:1–7',
        resumo: 'A exortação à humildade e o cuidado paternal de Deus.',
        texto: `1. Aos presbíteros, que estão entre vós, admoesto eu, que sou também presbítero com eles, e testemunha dos sofrimentos de Cristo, e participante da glória que se há de revelar:
2. Apascentai o rebanho de Deus, que está entre vós, tendo cuidado dele, não por força, mas voluntariamente; nem por torpe ganância, mas de ânimo pronto;
3. Nem como tendo domínio sobre a herança de Deus, mas servindo de exemplo ao rebanho.
4. E, quando aparecer o Sumo Pastor, alcançareis a incorruptível coroa da glória.
5. Semelhantemente vós jovens, sede sujeitos aos anciãos; e sede todos sujeitos uns aos outros, e revesti-vos de humildade, porque Deus resiste aos soberbos, mas dá graça aos humildes.
6. Humilhai-vos, pois, debaixo da potente mão de Deus, para que a seu tempo vos exalte;
7. Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Mateus 22:15–22',
        resumo: 'Dai a César o que é de César, e a Deus o que é de Deus.',
        texto: `15. Então retirando-se os fariseus, consultaram entre si como o surpreenderiam nalguma palavra;
16. E enviaram-lhe os seus discípulos, com os herodianos, dizendo: Mestre, bem sabemos que és verdadeiro, e ensinas o caminho de Deus segundo a verdade, e de ninguém se te dá, porque não olhas a aparência dos homens.
17. Dize-nos, pois, que te parece? É lícito pagar o tributo a César, ou não?
18. Jesus, porém, conhecendo a sua malícia, disse: Por que me tentais, hipócritas?
19. Mostrai-me a moeda do tributo. E eles lhe apresentaram um dinheiro.
20. E ele disse-lhes: De quem é esta imagem e esta inscrição?
21. Disseram-lhe eles: De César. Então ele lhes disse: Dai pois a César o que é de César, e a Deus o que é de Deus.
22. E eles, ouvindo isto, maravilharam-se, e, deixando-o, se retiraram.`
      }
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
      {
        tipo: 'Salmo',
        ref: 'Salmo 22:22-31',
        resumo: 'Anúncio do louvor e do reino do Senhor.',
        texto: `22. Então declararei o teu nome aos meus irmãos; louvar-te-ei no meio da congregação.
23. Vós, que temeis ao Senhor, louvai-o; todos vós, semente de Jacó, glorificai-o; e temei-o todos vós, semente de Israel.
24. Porque não desprezou nem abominou a aflição do aflito, nem dele escondeu o seu rosto; antes, quando clamou por ele, o ouviu.
25. O meu louvor será de ti na grande congregação; pagarei os meus votos perante os que o temem.
26. Os mansos comerão e se fartarão; louvarão ao Senhor os que o buscam; o vosso coração viverá eternamente.
27. Todos os limites da terra se lembrarão, e se converterão ao Senhor; e todas as famílias das nações adorarão perante a tua face.
28. Porque o reino é do Senhor, e ele domina entre as nações.
29. Todos os que na terra são gordos comerão e adorarão; todos os que descem ao pó se prostrarão perante ele; e nenhum poderá reter a vida da sua alma.
30. Uma semente o servirá; será declarada ao Senhor com respeito à geração vindoura.
31. Chegarão e anunciarão a sua justiça ao povo que nascer, porquanto ele o fez.`
      },
      {
        tipo: 'Epístola',
        ref: '2 Coríntios 12:1-10',
        resumo: 'O espinho na carne e a suficiência da graça.',
        texto: `1. Em verdade que não convém gloriar-me; mas passarei às visões e revelações do Senhor.
2. Conheço um homem em Cristo que há catorze anos (se no corpo, não sei, se fora do corpo, não sei; Deus o sabe) foi arrebatado até ao terceiro céu.
3. E sei que o tal homem (se no corpo, se fora do corpo, não sei; Deus o sabe)
4. Foi arrebatado ao paraíso; e ouviu palavras inefáveis, que não é lícito ao homem referir.
5. De um tal me gloriarei eu, mas de mim mesmo não me gloriarei, senão nas minhas fraquezas.
6. Porque, se quiser gloriar-me, não serei insensato, porque direi a verdade; mas me abstenho, para que ninguém cuide de mim acima do que em mim vê ou de mim ouve.
7. E, para que não me exaltasse pelas excelências das revelações, foi-me dado um espinho na carne, a saber, um mensageiro de Satanás para me esbofetear, a fim de não me exaltar.
8. Acerca do qual três vezes orei ao Senhor que o afastasse de mim.
9. E disse-me: A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza. De boa vontade, pois, me gloriarei nas minhas fraquezas, para que em mim habite o poder de Cristo.
10. Por isso sinto prazer nas fraquezas, nas injúrias, nas necessidades, nas perseguições, nas angústias por amor de Cristo. Porque quando estou fraco então sou forte.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Lucas 23:33-43',
        resumo: 'A crucificação e o perdão de Jesus na cruz.',
        texto: `33. E, quando chegaram ao lugar chamado Caveira, ali o crucificaram, e aos malfeitores, um à direita e outro à esquerda.
34. E dizia Jesus: Pai, perdoa-lhes, porque não sabem o que fazem. E, repartindo as suas vestes, lançaram sortes.
35. E o povo estava olhando. E também os príncipes zombavam dele, dizendo: Aos outros salvou, salve-se a si mesmo, se este é o Cristo, o escolhido de Deus.
36. E também os soldados o escarneciam, chegando-se a ele, e oferecendo-lhe vinagre.
37. E dizendo: Se tu és o Rei dos Judeus, salva-te a ti mesmo.
38. E também por cima dele, estava escrita uma inscrição, em letras gregas, romanas e hebraicas: ESTE É O REI DOS JUDEUS.
39. E um dos malfeitores que estavam pendurados blasfemava dele, dizendo: Se tu és o Cristo, salva-te a ti mesmo e a nós.
40. Respondendo, porém, o outro, repreendia-o, dizendo: Tu nem ainda temes a Deus, estando na mesma condenação?
41. E nós, na verdade, com justiça, porque recebemos o que os nossos feitos mereciam; mas este nenhum mal fez.
42. E disse a Jesus: Senhor, lembra-te de mim, quando entrares no teu reino.
43. E disse-lhe Jesus: Em verdade te digo que hoje estarás comigo no Paraíso.`
      }
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
      {
        tipo: 'Salmo',
        ref: 'Salmo 62:1-8',
        resumo: 'Somente em Deus a minha alma descansa.',
        texto: `1. A minha alma espera somente em Deus; dele vem a minha salvação.
2. Só ele é a minha rocha e a minha salvação; é a minha defesa; não serei grandemente abalado.
3. Até quando maquinareis o mal contra um homem? Sereis mortos todos vós, sereis como uma parede curvada e uma sebe prestes a cair.
4. Eles só consultam como o hão de derrubar da sua excelência; deleitam-se em mentiras; com a boca bendizem, mas no seu interior maldizem.
5. Ó minha alma, espera somente em Deus, porque dele vem a minha esperança.
6. Só ele é a minha rocha e a minha salvação; é a minha defesa; não serei abalado.
7. Em Deus está a minha salvação e a minha glória; a rocha da minha força, e o meu refúgio estão em Deus.
8. Confiai nele, ó povo, em todo o tempo; derramai perante ele o vosso coração. Deus é o nosso refúgio.`
      },
      {
        tipo: 'Antigo Testamento',
        ref: 'Isaías 30:15-18',
        resumo: 'No descanso e na confiança está a força.',
        texto: `15. Porque assim diz o Senhor DEUS, o Santo de Israel: Em vos converterdes e em sossegardes está a vossa salvação; na tranquilidade e na confiança estava a vossa força, mas não quisestes.
16. Mas dissestes: Não, antes fugiremos a cavalo; portanto fugireis; e: Cavalgaremos sobre cavalos ligeiros; portanto os vossos perseguidores serão ligeiros.
17. Um milhar fugirá ao grito de um só, e ao grito de cinco todos vós fugireis, até que sejais deixados como o mastro no cume do monte, e como a bandeira no outeiro.
18. Por isso, o SENHOR esperará, para ter misericórdia de vós; e por isso se levantará, para se compadecer de vós, porque o SENHOR é um Deus de equidade; bem-aventurados todos os que por ele esperam.`
      },
      {
        tipo: 'Evangelho',
        ref: 'Mateus 11:28-30',
        resumo: 'O convite do Senhor ao descanso da alma.',
        texto: `28. Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.
29. Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração; e encontrareis descanso para as vossas almas.
30. Porque o meu jugo é suave e o meu fardo é leve.`
      }
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
        texto: `1. O SENHOR é o meu pastor, nada me faltará.
2. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.
3. Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.
4. Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.
5. Preparas uma mesa perante mim na presença dos meus inimigos, meunges a minha cabeça com óleo, o meu cálice transborda.
6. Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.`
      },
      {
        tipo: 'Novo Testamento',
        ref: 'Filipenses 4:4-9',
        resumo: 'A paz de Deus que excede todo o entendimento.',
        texto: `4. Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.
5. Seja a vossa moderação conhecida de todos os homens. Perto está o Senhor.
6. Não estejais ansiosos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.
7. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.
8. Quanto ao mais, irmãos, tudo o que é verdadeiro, tudo o que é honesto, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se há alguma virtude, e se há algum louvor, nisso pensai.
9. O que também aprendestes, e recebestes, e ouvistes, e vistes em mim, isso fazei; e o Deus de paz será convosco.`
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
  ['NTLH', 'NTLH (Nova Tradução na Linguagem de Hoje)'],
  ['NVI-PT', 'NVI (Nova Versão Internacional)'],
  ['ARA', 'ARA (Almeida Revista e Atualizada)'],
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
