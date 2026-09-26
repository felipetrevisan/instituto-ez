import type { Ebook } from '@ez/web/types/catalog'

export const digitalProducts = {
  hero: {
    eyebrow: 'Produtos Digitais',
    title: 'Transforme seu conhecimento em resultados',
    subtitle: 'Acesse conteúdos exclusivos desenvolvidos pelo neurocientista Enzo Pasqualetti.',
    text: 'eBooks e webinários que unem ciência e prática para sua evolução pessoal e profissional.',
  },
  catalog: {
    eyebrow: 'eBooks',
    title: 'Conhecimento em suas mãos',
    text: 'eBooks desenvolvidos com base em neurociência e comportamento humano para transformar sua mentalidade e acelerar seus resultados.',
    cta: 'Saiba mais',
  },
}

/** Dados iniciais (seed) e fallback quando o Firebase não está configurado. */
export const seedEbooks: Ebook[] = [
  {
    id: 'o-poder-da-inteligencia-emocional',
    slug: 'o-poder-da-inteligencia-emocional',
    title: 'O Poder da Inteligência Emocional',
    description:
      'Descubra como dominar suas emoções pode transformar completamente sua vida. Você não precisa ser refém do estresse, da ansiedade ou da impulsividade. Este guia prático e científico mostra como gerenciar pensamentos e sentimentos com clareza, desenvolver o autocontrole sob pressão e construir relacionamentos mais fortes e autênticos. Com técnicas validadas pela neurociência e pela psicologia, você terá em mãos um caminho confiável para manter o equilíbrio em momentos críticos, tomar decisões conscientes, aumentar a confiança e alcançar resultados reais.',
    accent: '#e54c5b',
    accentSecondary: '#b94c23',
    cover: '/assets/ebooks/o-poder-da-inteligencia-emocional/cover.webp',
    pages: [
      '/assets/ebooks/o-poder-da-inteligencia-emocional/page-1.webp',
      '/assets/ebooks/o-poder-da-inteligencia-emocional/page-2.webp',
      '/assets/ebooks/o-poder-da-inteligencia-emocional/page-3.webp',
    ],
    heroImage: '/assets/ebooks/o-poder-da-inteligencia-emocional/og.webp',
    badges: { rating: 5, downloads: 500, updated: '2026' },
    metadata: [
      { value: 180, label: 'Total de Páginas', icon: 'book-open' },
      { value: 10, label: 'Capítulos', icon: 'book' },
      { value: 12, label: 'Exercícios Práticos', icon: 'activity' },
      { value: 80, label: 'Referências Bibliográficas', icon: 'chart' },
      { value: 'PDF', label: 'Acesso Imediato', icon: 'file' },
    ],
    index: {
      title: 'Transforme suas emoções em sua maior força!',
      videoTitle: 'Veja o vídeo e conheça mais!',
      videoId: 't-cYk869nKg',
      paragraphs: [
        '**A inteligência emocional** não é um dom reservado a poucos, mas uma **habilidade treinável** que pode **transformar a sua vida**. Ao desenvolvê-la, você conquista **clareza mental** para enxergar caminhos mesmo em meio ao caos, **equilíbrio** para manter a calma diante da pressão e **confiança** para transformar desafios em **oportunidades de crescimento.**',
        'Essa capacidade permite que você **supere o estresse e a ansiedade** sem deixar que eles dominem suas escolhas, cultivando **relacionamentos mais saudáveis,** baseados na **empatia,** na **comunicação clara** e em **conexões autênticas.** Você aprende a **conter a impulsividade,** a pausar, **refletir** e **agir de forma estratégica,** tomando **decisões conscientes** que equilibram emoção e razão, mesmo nos momentos mais críticos.',
        'Ignorar esse desenvolvimento cobra um preço alto: **decisões precipitadas que geram arrependimentos, conflitos que poderiam ser evitados, estresse constante** que mina sua energia e **oportunidades perdidas** que não voltam mais. Este eBook foi criado para ser o seu guia prático nesse processo de mudança, oferecendo estratégias claras, embasadas em ciência e aplicáveis no seu dia a dia. Ao colocar em prática o que vai aprender, suas emoções deixam de ser um peso e se tornam uma força poderosa.',
        'Você conquista mais equilíbrio, melhora sua performance profissional, fortalece seus relacionamentos e alcança resultados que antes pareciam distantes. Cada página foi pensada para ajudá-lo a transformar teoria em prática, mostrando de forma simples e objetiva como viver com mais propósito e alcançar o sucesso que deseja.',
      ],
      closing:
        'Adquira agora o seu eBook: O Poder da Inteligência emocional e dê o primeiro passo para conquistar a clareza e a confiança necessárias para enfrentar qualquer desafio e alcançar o resultado para sua vida que tanto deseja!',
    },
    questions: [
      {
        question: 'Este eBook é para iniciantes ou para quem já estudou o tema?',
        answer:
          'Para ambos. O conteúdo começa com fundamentos e avança para técnicas práticas com exemplos reais.',
      },
      {
        question: 'Quanto tempo leva para ver resultados?',
        answer:
          'Em poucos dias você percebe mais clareza e controle. Em quatro semanas os novos hábitos ficam consistentes.',
      },
      {
        question: 'O conteúdo é realmente científico?',
        answer:
          'O material é fundamentado em neurociência e psicologia, com referências atualizadas e exercícios baseados em evidências.',
      },
      {
        question: 'Como aplico no trabalho e na vida pessoal?',
        answer:
          'Cada capítulo traz exercícios práticos e roteiros de comunicação para reuniões, conversas difíceis e decisões privadas.',
      },
    ],
    author: {
      name: 'Enzo Pasqualetti',
      photo: '/assets/images/enzo-pasqualetti.webp',
      paragraphs: [
        'Enzo Pasqualetti é Mestre em Neurociência e Cognição pela Universidade Federal do ABC, Bacharel em Ciências Econômicas pela Fundação Armando Alvares Penteado e possui certificação internacional em Medical Neuroscience pela Duke University.',
        'Atua há mais de 15 anos em colaboração com psicólogos e psiquiatras no acompanhamento de casos graves relacionados à saúde mental, unindo formação científica sólida e experiência prática no estudo do cérebro, das emoções e do comportamento humano.',
        'Seus conteúdos têm como propósito traduzir a complexidade da neurociência em conhecimento acessível e aplicável, oferecendo ao leitor uma base científica confiável em sua jornada de desenvolvimento pessoal e profissional.',
      ],
      closing:
        'Adquira já o seu eBook e comece a explorar conceitos científicos de forma clara, objetiva e prática.',
    },
    price: { regular: 49.9, label: 'Apenas' },
    cta: 'Quero Meu Ebook!',
    payment: { provider: 'none', hotmartUrl: '' },
    downloadUrl: '',
    file: null,
    published: true,
    order: 0,
  },
]
