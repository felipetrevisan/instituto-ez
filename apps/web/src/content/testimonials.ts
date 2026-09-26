import type { Testimonial, TestimonialArea } from '@ez/web/types/catalog'

type Entry = { author: string; text: string }

const home: Entry[] = [
  {
    author: 'André, Representante Comercial',
    text: 'Há cerca de 3 anos, desesperançado devido à dependência química, marquei uma reunião com Enzo sugerida por um amigo. Já tinha passado por inúmeras tentativas de cura, mas ao conhecer Enzo, encontrei esperança. Ele, além de um profundo entendimento, mostrou compaixão, sem julgamentos. Com sua abordagem acessando meu cérebro, consegui superar a dependência. Hoje, limpo por 2 anos e 5 meses, sinto que houve uma mudança neurológica. Reconheço minha condição como uma doença, afetando 15% da população global, e mantenho-me consciente, valorizando a palavra decisão. Gratidão eterna a Enzo, profissional e amigo.',
  },
  {
    author: 'Fernando Sugiyama, Empresário',
    text: 'A busca pelo autoconhecimento e transformação inicia quando enfrentamos nossos medos, deixamos a zona de conforto e encaramos a realidade, assumindo responsabilidades. Essa jornada, que alcancei por méritos próprios, foi facilitada pelo Instituto Ez, especialmente seu fundador, Enzo Pasqualetti. Além de um excelente profissional e defensor de ideais, ele se mostrou um grande amigo, percebendo nuances sem que eu precisasse expressar. Com ética, responsabilidade e técnica, Enzo é capaz de transformar vidas de maneira disruptiva neste crucial campo do desenvolvimento humano. Agradeço por sua ajuda fundamental!',
  },
  {
    author: 'Leonardo Silva Brene, Professor Hospitalar',
    text: 'Houve momentos em minha vida que passei por grandes obstáculos, e mesmo com os conselhos de minha família e dos amigos, eu não conseguia superar e seguir em frente. Então, conhecer o Enzo, me ajudou muito! Em todas as suas consultas, pude me sentir mais capacitado, mais seguro e que tudo é possível de se alcançar, mesmo indo poucas vezes, suas consultas mudaram a minha vida, e serei eternamente grato por conhecê-lo.',
  },
  {
    author: 'Adriana Taguti, Cabeleireira',
    text: 'Cerca de seis anos atrás, enfrentei minha primeira crise de síndrome do pânico no trânsito. Após exames e diagnóstico psiquiátrico, vivi várias crises, evitando situações desencadeantes. Conheci Enzo há alguns anos, começamos a trabalhar juntos semanalmente, reduzindo gradualmente as sensações de pânico. Graças a ele, superei o medo, retomei minha vida social e hoje consigo enfrentar qualquer situação sem crises. Acredito que é possível amenizar e até curar a síndrome. Espero que, assim como Enzo me ajudou, este depoimento possa ser útil a muitos.',
  },
  {
    author: 'Ana Silva, Professora',
    text: 'Minha jornada contra a depressão teve uma virada significativa quando descobri o Instituto Ez. O acolhimento e a expertise do Neurocientista Enzo Pasqualetti foram fundamentais. Sua abordagem científica aliada a uma compreensão empática trouxe luz às minhas sombras emocionais. As estratégias personalizadas e o suporte contínuo do Instituto Ez foram cruciais para minha recuperação. Sou profundamente grata por ter encontrado um caminho para a cura com a ajuda deste notável profissional e instituição.',
  },
  {
    author: 'Carlos Oliveira, Engenheiro',
    text: 'Minha trajetória para superar a ansiedade ganhou um novo fôlego com a descoberta do Instituto Ez e o Neurocientista Enzo Pasqualetti. Como engenheiro, sempre busquei soluções lógicas, e foi incrível encontrar uma abordagem científica para enfrentar a ansiedade. Enzo, com sua empatia e conhecimento, ofereceu ferramentas práticas e estratégias personalizadas que fizeram toda a diferença. O Instituto Ez tornou-se meu refúgio seguro durante esse processo de autodescoberta e controle emocional. Agradeço sinceramente por esta transformadora experiência.',
  },
  {
    author: 'Henrique Ramos, Médico',
    text: 'Realizei algumas sessões com o Enzo Pasqueletti. Acredito que os pontos chaves foram as capacidades de: compreender a situação; direcionar o raciocínio durante as sessões para encontrar a solução. Como foi realizada uma estratégia de atuação, a melhora foi perceptível durante cada sessão e no período subsequente. As experiências tiveram significância e serviram como amadurecimento pessoal.',
  },
  {
    author: 'Leandro, Gerente Comercial',
    text: 'Trabalhar com o Enzo foi incrivelmente prazeroso. Juntos, planejamos soluções para meus problemas, identificando áreas de melhoria. Por meio de conversas e exercícios, Enzo proporcionou um ambiente acolhedor, permitindo que eu me conhecesse profundamente. A cada encontro, ganhava conhecimento, aprendizado e uma nova perspectiva sobre minha vida, além de um bem-estar duradouro. O que começou como coincidência se transformou em um prêmio inestimável. Agradeço imensamente por tudo!',
  },
]

const immersion: Entry[] = [
  {
    author: 'Juliana Rocha – 32 anos, professora',
    text: 'Eu achava que minha fé estava fraca, sabe? Sentia um vazio, uma angústia que eu não sabia de onde vinha. Quando entrei nessa imersão, foi como se alguém acendesse uma luz dentro de mim. Pela primeira vez, entendi como minha mente e minha fé se conectam de forma profunda. Chorei, me reconectei comigo mesma e com Deus. Hoje, tenho mais clareza, durmo em paz e sei que tudo tem um propósito. Foi mais do que conhecimento… foi cura.',
  },
  {
    author: 'Camila Brandão – 39 anos, médica',
    text: 'Minha rotina é extremamente técnica, racional, cheia de decisões baseadas em evidências. Sempre tive fé, mas confesso que por muito tempo ela ficou em segundo plano, quase como um detalhe esquecido. A imersão me proporcionou algo raro: um espaço onde ciência e espiritualidade não apenas coexistem, mas se complementam. A abordagem inter-religiosa me permitiu transitar com leveza por reflexões profundas, sem dogmas, com liberdade. Saí mais inteira, como profissional, como mulher e como ser espiritual. Foi uma reconexão que me devolveu clareza, propósito e serenidade.',
  },
  {
    author: 'Marcos Vieira – 45 anos, empresário',
    text: 'Sempre fui muito racional, meio cético até. Mas essa imersão mexeu comigo. A forma como explicam a neurociência e ligam isso à espiritualidade é algo fora do comum. Foi nesse processo que entendi que fé não é só acreditar, é sentir, é viver. Encontrei respostas que há anos eu buscava em silêncio. Me reconectei com minha essência e percebi que o caminho da fé também passa pelo autoconhecimento. Foi transformador.',
  },
  {
    author: 'Leandro Nascimento – 41 anos, gerente',
    text: 'Minha vida era só trabalho e preocupação. Tava cansado, desanimado e cheio de perguntas sem resposta. Quando entrei nessa imersão, não imaginava o que vinha pela frente. Cara, foi como se eu tivesse tirado uma venda dos olhos. Tudo fez sentido. Descobri que minha fé não tava perdida, só precisava ser relembrada. A parte da neurociência me fez entender que meus pensamentos estavam me afastando da minha própria paz. Hoje vivo mais leve, mais consciente e mais perto de Deus.',
  },
  {
    author: 'Larissa Menezes – 18 anos, estudante',
    text: 'Eu entrei nessa imersão sem saber o que esperar. Achei que ia ser aquela coisa chata, cheia de regras, mas foi totalmente diferente! Foi leve, de boa mesmo, ninguém ficou tentando empurrar religião pra cima de mim. Falaram de Deus, de fé, de mente, tudo de um jeito que fez sentido. Me tocou de um jeito real, sabe? Tive vários momentos que parei e pensei: ‘caraca, é isso’. Saí de lá mais tranquila, mais confiante, mais conectada comigo. Mudou minha visão das coisas.',
  },
  {
    author: 'Felipe Andrade – 36 anos, bancário',
    text: 'O que mais me chamou atenção nessa imersão foi que ela não te prende a uma religião específica. É inter-religiosa. Isso me deu uma liberdade imensa pra viver tudo sem medo, sem julgamentos. Cada um ali tinha sua história, sua fé, sua forma de ver Deus, e tudo foi respeitado. Foi leve, foi profundo, foi verdadeiro. Eu consegui me conectar com a espiritualidade de um jeito que fazia sentido pra mim, sem precisar seguir um roteiro pronto. E o mais louco é que, mesmo com tantas crenças diferentes, todo mundo saiu transformado. Foi um encontro com a fé, com o outro, e comigo mesmo.',
  },
  {
    author: 'Ana Cláudia Mello – 35 anos, mãe e dona de casa',
    text: 'Eu me sentia sozinha, sobrecarregada, e achava que rezar era só pedir força pra aguentar mais um dia. Mas na imersão, eu aprendi que fé também é ciência, também é escolha diária. Chorei muito, revi minha história, perdoei coisas que me machucavam há anos. Foi como se eu voltasse pra casa, pra mim mesma. Saí de lá com outra energia, outra mente, outro espírito. A conexão que tive com Deus foi pessoal, real, íntima. Não dá pra explicar, só vivendo.',
  },
  {
    author: 'Bianca Ferreira – 29 anos, designer',
    text: 'Sempre tive fé, mas ela tava adormecida, escondida no meio da correria da vida. A imersão foi como um chamado. Consegui entender como meu cérebro funciona e, ao mesmo tempo, sentir Deus de um jeito que nunca tinha sentido antes. Foi libertador. Me vi chorando, rindo, me perdoando... Foi uma reconexão com tudo que eu sou. Hoje, oro com presença, vivo com propósito e entendi que fé também é ciência vivida no coração.',
  },
]

const make = (entries: Entry[], prefix: string, areas: TestimonialArea[]): Testimonial[] =>
  entries.map((entry, index) => ({
    id: `${prefix}-${index + 1}`,
    ...entry,
    areas,
    ebookIds: [],
    published: true,
    order: index,
  }))

// André e Fernando também aparecem nas páginas de ebook, como no site original.
const alsoOnEbooks = new Set(['home-1', 'home-2'])

/** Dados iniciais (seed) e fallback quando o Firebase não está configurado. */
export const seedTestimonials: Testimonial[] = [
  ...make(home, 'home', ['home']).map((item) =>
    alsoOnEbooks.has(item.id) ? { ...item, areas: ['home', 'ebooks'] as TestimonialArea[] } : item,
  ),
  ...make(immersion, 'immersion', ['immersion']),
  {
    id: 'ebook-1',
    author: 'Mariana Silva, Empreendedora',
    text: 'O livro me mostrou como controlar minhas emoções no dia a dia de forma simples e prática. Hoje consigo manter o foco até nos momentos de pressão. Vale a pena!!',
    areas: ['ebooks'],
    ebookIds: ['o-poder-da-inteligencia-emocional'],
    published: true,
    order: -1,
  },
]
