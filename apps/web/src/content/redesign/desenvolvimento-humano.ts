import type { Locale } from 'next-intl'
import type { RedesignDesenvolvimentoContent } from './types'

/**
 * "Desenvolvimento Humano" page copy. pt is the real content from the live
 * site's landingPage doc (key: "for-business"). en/es are draft
 * translations — the live site's own en/es fields for this page just
 * duplicate the Portuguese text, so there's no real source to pull from yet.
 */
export const redesignDesenvolvimentoContent: Record<Locale, RedesignDesenvolvimentoContent> = {
  pt: {
    hero: {
      title: 'Evoluir o desempenho da empresa começa pelo',
      highlight: 'desenvolvimento das pessoas',
      subtitle:
        'Unimos ciência do comportamento, saúde mental e autoconsciência para promover equilíbrio, bem-estar e relações mais saudáveis no ambiente de trabalho.',
      ctaPrimary: 'Solicitar proposta',
      ctaSecondary: 'Falar com o Instituto',
    },
    intro: {
      title: 'Transformação começa de dentro, onde corpo e mente se alinham.',
      items: ['Desenvolvimento Contínuo', 'Saúde Integral', 'Neurociência'],
      paragraph:
        'Compreender nossos processos internos fortalece organização mental, estabilidade emocional e capacidade de adaptação. Quando cuidamos da saúde física e emocional, criamos espaço para decisões mais claras, menos sobrecarga e uma sensação maior de presença e bem-estar ao longo do dia. Esse olhar interno, guiado por conhecimento científico, favorece um ritmo mais equilibrado e sustentável de evolução.',
      imageAlt: 'Equilíbrio entre corpo e mente no ambiente corporativo',
    },
    workshops: {
      eyebrow: 'Programas Corporativos',
      title: 'Quando a comunicação se alinha à mente, tudo avança com mais consistência',
      subheading:
        'Nossos workshops combinam teoria, prática e conhecimentos da neurociência para ampliar competências de gestão e comportamento. São formações desenvolvidas para profissionais e equipes que buscam alinhar propósito, evolução e desempenho.',
      cards: [
        {
          title: 'Rapport Comunicação Inteligente',
          description:
            'Aprenda a criar conexões genuínas e estratégicas por meio de uma comunicação consciente e eficaz.',
          text: 'Neste workshop, você aprende as bases técnicas do rapport e como ajustar linguagem verbal e não verbal para gerar empatia, confiança e sintonia em qualquer interação. Com fundamentos da neurociência e da psicologia social, o conteúdo mostra como identificar padrões emocionais, interpretar sinais comportamentais e adaptar sua comunicação de forma assertiva.',
          time: '1h30 a 2h',
          cta: 'Quero esse workshop',
          categories: ['Comunicação', 'conexão', 'persuasão'],
          imageAlt: 'Workshop de comunicação e rapport',
        },
        {
          title: 'Neurociência do Pensamento Positivo',
          description:
            'Entenda, de forma científica, como pensamentos moldam emoções, decisões e resultados.',
          text: 'Neste workshop, você descobre como padrões de pensamento influenciam diretamente o funcionamento cerebral, regulando emoções, fortalecendo a resiliência e moldando a forma como lidamos com desafios. Estratégias práticas mostram como treinar o cérebro para adotar perspectivas mais construtivas.',
          time: '1h30 a 2h',
          cta: 'Quero esse workshop',
          categories: ['Ciência', 'mentalidade', 'resiliência'],
          imageAlt: 'Workshop de neurociência do pensamento positivo',
        },
      ],
    },
    lectures: {
      eyebrow: 'Palestras',
      title: 'Aprendizado que inspira mudança',
      subheading:
        'Nossas palestras cuidam da saúde do ser humano de forma integral, unindo mente e corpo para promover equilíbrio e bem-estar no cotidiano. Com uma abordagem leve e acolhedora, apresentam caminhos simples para fortalecer a saúde emocional, cultivar autocuidado e construir uma rotina mais saudável e harmoniosa.',
      cards: [
        {
          title: 'Saúde Mental nas Empresas',
          tag: 'NR-1 e NR-12',
          description: 'Depressão, Ansiedade e Burnout',
          text: 'Fundamentada em neurociência, esta palestra explica de forma clara como identificar e entender sinais de depressão, ansiedade e burnout, seus impactos no desempenho e medidas práticas para prevenção e redução de danos, ajudando empresas a atuar dentro das normas e construir um ambiente mais seguro e saudável.',
          cta: 'Solicitar palestra NR-1 e NR-12',
          imageAlt: 'Palestra sobre saúde mental nas empresas',
        },
        {
          title: 'Saúde e Bem-estar',
          tag: 'Autocuidado',
          description: 'Autocuidado, Bem-Estar e Equilíbrio Feminino',
          text: 'Esta palestra destaca a importância de cultivar uma rotina que fortaleça corpo, mente e identidade feminina, com práticas de autocuidado, organização interna e escolhas que aumentam vitalidade, clareza e bem-estar diário.',
          cta: 'Quero levar essa palestra',
          imageAlt: 'Palestra sobre saúde e bem-estar feminino',
        },
      ],
    },
    consulting: {
      title: 'Para empresas que buscam evolução contínua',
      subheading:
        'Quando a transformação precisa ser mais profunda, o Instituto EZ oferece consultorias personalizadas com mentoria estratégica.',
      items: [
        'Desenvolvimento empresarial',
        'Alinhamento de processos',
        'Indicadores de desempenho',
        'Acompanhamento contínuo',
      ],
      footer: 'O resultado é uma cultura organizacional mais coerente, humana e eficiente.',
      cta: 'Clique aqui para saber mais',
      imageAlt: 'Consultoria estratégica para empresas',
    },
    closing: {
      title:
        'Existe um momento em que a vida pede mais leveza e precisão. Quando esse momento chegar, estaremos aqui para ajudar você e sua empresa a encontrá-las.',
      text: 'Conte-nos sobre seu desafio. Em uma conversa inicial, identificamos as prioridades e traçamos o melhor caminho para o seu time evoluir.',
      ctaPrimary: 'Falar com o Instituto',
      ctaSecondary: 'Solicitar proposta personalizada',
    },
  },
  en: {
    hero: {
      title: 'Improving company performance starts with',
      highlight: 'developing people',
      subtitle:
        'We combine behavioral science, mental health, and self-awareness to promote balance, well-being, and healthier relationships in the workplace.',
      ctaPrimary: 'Request Proposal',
      ctaSecondary: 'Talk to the Institute',
    },
    intro: {
      title: 'Transformation starts from within, where body and mind align.',
      items: ['Continuous Development', 'Integral Health', 'Neuroscience'],
      paragraph:
        'Understanding our internal processes strengthens mental organization, emotional stability, and adaptability. When we care for physical and emotional health, we create room for clearer decisions, less overload, and a greater sense of presence and well-being throughout the day.',
      imageAlt: 'Balance between body and mind in the corporate environment',
    },
    workshops: {
      eyebrow: 'Corporate Programs',
      title: 'When communication aligns with the mind, everything moves forward more consistently',
      subheading:
        'Our workshops combine theory, practice, and neuroscience to expand management and behavioral skills — built for professionals and teams seeking to align purpose, growth, and performance.',
      cards: [
        {
          title: 'Rapport & Smart Communication',
          description:
            'Learn to build genuine, strategic connections through conscious, effective communication.',
          text: 'In this workshop, you learn the technical foundations of rapport and how to adjust verbal and nonverbal language to generate empathy, trust, and rapport in any interaction.',
          time: '1h30 to 2h',
          cta: 'I Want This Workshop',
          categories: ['Communication', 'connection', 'persuasion'],
          imageAlt: 'Communication and rapport workshop',
        },
        {
          title: 'Neuroscience of Positive Thinking',
          description:
            'Understand, scientifically, how thoughts shape emotions, decisions, and results.',
          text: 'In this workshop, you discover how thought patterns directly influence brain function, regulating emotions, strengthening resilience, and shaping how we handle challenges.',
          time: '1h30 to 2h',
          cta: 'I Want This Workshop',
          categories: ['Science', 'mindset', 'resilience'],
          imageAlt: 'Neuroscience of positive thinking workshop',
        },
      ],
    },
    lectures: {
      eyebrow: 'Lectures',
      title: 'Learning that inspires change',
      subheading:
        'Our lectures care for the whole human being, uniting mind and body to promote balance and well-being in daily life, with practical, welcoming paths to strengthen emotional health.',
      cards: [
        {
          title: 'Mental Health in the Workplace',
          tag: 'NR-1 & NR-12',
          description: 'Depression, Anxiety, and Burnout',
          text: 'Grounded in neuroscience, this lecture clearly explains how to identify signs of depression, anxiety, and burnout, their impact on performance, and practical prevention measures.',
          cta: 'Request NR-1 & NR-12 Lecture',
          imageAlt: 'Lecture on mental health in the workplace',
        },
        {
          title: 'Health & Well-being',
          tag: 'Self-care',
          description: 'Self-care, Well-being & Women’s Balance',
          text: 'This lecture highlights the importance of a routine that strengthens body, mind, and identity, with self-care practices and choices that increase vitality, clarity, and daily well-being.',
          cta: 'I Want This Lecture',
          imageAlt: 'Lecture on women’s health and well-being',
        },
      ],
    },
    consulting: {
      title: 'For companies seeking continuous evolution',
      subheading:
        'When transformation needs to go deeper, Instituto EZ offers personalized consulting with strategic mentoring.',
      items: [
        'Business development',
        'Process alignment',
        'Performance indicators',
        'Ongoing support',
      ],
      footer: 'The result is a more coherent, human, and efficient organizational culture.',
      cta: 'Click Here to Learn More',
      imageAlt: 'Strategic consulting for companies',
    },
    closing: {
      title:
        'There’s a moment when life calls for more ease and precision. When it comes, we’ll be here to help you and your company find them.',
      text: 'Tell us about your challenge. In an initial conversation, we identify priorities and map out the best path for your team to grow.',
      ctaPrimary: 'Talk to the Institute',
      ctaSecondary: 'Request a Custom Proposal',
    },
  },
  es: {
    hero: {
      title: 'Mejorar el desempeño de la empresa empieza por el',
      highlight: 'desarrollo de las personas',
      subtitle:
        'Unimos ciencia del comportamiento, salud mental y autoconciencia para promover equilibrio, bienestar y relaciones más saludables en el entorno laboral.',
      ctaPrimary: 'Solicitar propuesta',
      ctaSecondary: 'Hablar con el Instituto',
    },
    intro: {
      title: 'La transformación empieza por dentro, donde cuerpo y mente se alinean.',
      items: ['Desarrollo Continuo', 'Salud Integral', 'Neurociencia'],
      paragraph:
        'Comprender nuestros procesos internos fortalece la organización mental, la estabilidad emocional y la capacidad de adaptación. Cuando cuidamos la salud física y emocional, creamos espacio para decisiones más claras y una mayor sensación de bienestar.',
      imageAlt: 'Equilibrio entre cuerpo y mente en el entorno corporativo',
    },
    workshops: {
      eyebrow: 'Programas Corporativos',
      title: 'Cuando la comunicación se alinea con la mente, todo avanza con más consistencia',
      subheading:
        'Nuestros workshops combinan teoría, práctica y neurociencia para ampliar competencias de gestión y comportamiento, pensados para equipos que buscan alinear propósito, evolución y desempeño.',
      cards: [
        {
          title: 'Rapport y Comunicación Inteligente',
          description:
            'Aprende a crear conexiones genuinas y estratégicas a través de una comunicación consciente y eficaz.',
          text: 'En este workshop aprendes las bases técnicas del rapport y cómo ajustar el lenguaje verbal y no verbal para generar empatía, confianza y sintonía en cualquier interacción.',
          time: '1h30 a 2h',
          cta: 'Quiero este workshop',
          categories: ['Comunicación', 'conexión', 'persuasión'],
          imageAlt: 'Workshop de comunicación y rapport',
        },
        {
          title: 'Neurociencia del Pensamiento Positivo',
          description:
            'Entiende, de forma científica, cómo los pensamientos moldean emociones, decisiones y resultados.',
          text: 'En este workshop descubres cómo los patrones de pensamiento influyen directamente en el funcionamiento cerebral, regulando emociones y fortaleciendo la resiliencia.',
          time: '1h30 a 2h',
          cta: 'Quiero este workshop',
          categories: ['Ciencia', 'mentalidad', 'resiliencia'],
          imageAlt: 'Workshop de neurociencia del pensamiento positivo',
        },
      ],
    },
    lectures: {
      eyebrow: 'Conferencias',
      title: 'Aprendizaje que inspira el cambio',
      subheading:
        'Nuestras conferencias cuidan la salud del ser humano de forma integral, uniendo mente y cuerpo para promover equilibrio y bienestar en el día a día.',
      cards: [
        {
          title: 'Salud Mental en las Empresas',
          tag: 'NR-1 y NR-12',
          description: 'Depresión, Ansiedad y Burnout',
          text: 'Fundamentada en neurociencia, esta conferencia explica cómo identificar señales de depresión, ansiedad y burnout, su impacto en el desempeño y medidas prácticas de prevención.',
          cta: 'Solicitar conferencia NR-1 y NR-12',
          imageAlt: 'Conferencia sobre salud mental en las empresas',
        },
        {
          title: 'Salud y Bienestar',
          tag: 'Autocuidado',
          description: 'Autocuidado, Bienestar y Equilibrio Femenino',
          text: 'Esta conferencia destaca la importancia de cultivar una rutina que fortalezca cuerpo, mente e identidad, con prácticas de autocuidado que aumentan vitalidad y bienestar diario.',
          cta: 'Quiero esta conferencia',
          imageAlt: 'Conferencia sobre salud y bienestar femenino',
        },
      ],
    },
    consulting: {
      title: 'Para empresas que buscan evolución continua',
      subheading:
        'Cuando la transformación necesita ser más profunda, el Instituto EZ ofrece consultorías personalizadas con mentoría estratégica.',
      items: [
        'Desarrollo empresarial',
        'Alineación de procesos',
        'Indicadores de desempeño',
        'Acompañamiento continuo',
      ],
      footer: 'El resultado es una cultura organizacional más coherente, humana y eficiente.',
      cta: 'Haz clic aquí para saber más',
      imageAlt: 'Consultoría estratégica para empresas',
    },
    closing: {
      title:
        'Existe un momento en que la vida pide más ligereza y precisión. Cuando llegue ese momento, estaremos aquí para ayudarte a ti y a tu empresa a encontrarlas.',
      text: 'Cuéntanos sobre tu desafío. En una conversación inicial, identificamos las prioridades y trazamos el mejor camino para que tu equipo evolucione.',
      ctaPrimary: 'Hablar con el Instituto',
      ctaSecondary: 'Solicitar propuesta personalizada',
    },
  },
}
