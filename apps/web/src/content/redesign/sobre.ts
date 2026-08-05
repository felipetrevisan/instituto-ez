import type { Locale } from 'next-intl'
import type { RedesignAboutContent } from './types'

/** Real content from the live site (/pt/sobre-nos). en/es are draft translations. */
export const redesignAboutContent: Record<Locale, RedesignAboutContent> = {
  pt: {
    hero: {
      title: 'Instituto do Comportamento Humano e Inovação EZ',
      subtitle:
        'Onde a ciência vira direção e a direção vira resultado. Transformando mentes e negócios há mais de 15 anos através da união entre neurociência, economia, comportamento humano e inovação.',
      cta: 'Falar com o Instituto',
    },
    history: {
      eyebrow: 'Nossa História',
      title: 'Mais de 15 anos integrando ciência e transformação',
      body: 'O Instituto EZ nasceu da integração entre economia e neurociência, aliadas ao comportamento humano e à inovação. Há mais de 15 anos desenvolve métodos exclusivos que promovem transformações reais em indivíduos e organizações, por meio de processos estruturados, científicos e matemáticos, fundado por Enzo Pasqualetti, Mestre em Neurociência pela Universidade Federal do ABC, Bacharel em Ciências Econômicas pela FAAP e certificado em Medical Neuroscience pela Duke University.',
      imageAlt: 'Enzo Pasqualetti, fundador do Instituto EZ',
    },
    purpose: {
      title: 'Nosso Propósito',
      body: 'Ajudar pessoas a viverem com mais clareza e estabilidade, cuidando da saúde mental com ciência e sensibilidade. Apoiar empresas a criarem ambientes mais saudáveis e eficientes com análise, método e direção. Entregar resultados tangíveis por meio de exercícios neurocognitivos e sistemas neuroanalíticos, com precisão e humanidade, de acordo com a realidade de cada contexto.',
    },
    methodology: {
      title: 'Metodologia Exclusiva',
      body: 'No Instituto EZ, a metodologia foi criada para gerar clareza onde hoje existe peso, confusão e sobrecarga, tanto no indivíduo quanto dentro das empresas. Nos atendimentos, exercícios neurocognitivos são conduzidos com precisão e cuidado, promovendo liberação emocional e reorganização interna. Já nas organizações, aplicamos sistemas neuroanalíticos que transformam o que antes era apenas percepção em dados matemáticos, revelando padrões reais de comportamento, eficiência e desempenho.',
      imageAlt: 'Instituto EZ - propósito e visão',
    },
    offerings: {
      eyebrow: 'O que oferecemos?',
      title: 'Soluções pensadas para gerar impacto real',
      subtitle: 'Processos estruturados para elevar resultados com método e consistência.',
      items: [
        {
          title: 'Atendimentos Individuais',
          description:
            'Sessões personalizadas voltadas ao cuidado com a saúde mental, com foco em clareza, equilíbrio emocional e decisões mais consistentes.',
        },
        {
          title: 'Mentoria & Assessoria',
          description:
            'Acompanhamento estratégico para empresas e organizações que precisam ganhar direção, fortalecer decisões e executar com consistência.',
        },
        {
          title: 'Sistema Neuroanalítico',
          description:
            'Por meio dos Matematizadores, transforma o que antes era apenas percepção em dados matemáticos claros, revelando padrões reais de comportamento e desempenho.',
        },
        {
          title: 'Palestra & Workshops',
          description:
            'Encontros dinâmicos e aplicáveis sobre neurociência, comportamento humano, inteligência emocional, saúde mental e alta performance.',
        },
        {
          title: 'Imersão',
          description:
            'Um encontro presencial criado para reconexão interna, clareza e direção, integrando neurociência, consciência, espiritualidade e fé.',
        },
        {
          title: 'Ebooks e Conteúdo Digital',
          description:
            'Conteúdos que unem neurociência, inteligência emocional, saúde mental, finanças e economia em uma linguagem leve e convidativa.',
        },
      ],
    },
    closing: {
      title: 'Pronto para Dar o Próximo Passo?',
      body: 'Clareza não é sorte, é método. No Instituto EZ, você encontra não apenas ciência, mas um caminho construído com sentido e humanidade. Navegue pelas páginas, conheça nossas experiências e escolha o próximo passo da sua jornada com a gente.',
      cta: 'Falar com o Instituto',
    },
  },
  en: {
    hero: {
      title: 'Institute of Human Behavior and EZ Innovation',
      subtitle:
        'Where science becomes direction, and direction becomes results. Transforming minds and businesses for over 15 years through neuroscience, economics, human behavior, and innovation.',
      cta: 'Talk to the Institute',
    },
    history: {
      eyebrow: 'Our History',
      title: 'Over 15 years integrating science and transformation',
      body: 'Instituto EZ was born from the integration of economics and neuroscience, allied with human behavior and innovation. For over 15 years it has developed exclusive methods for real transformation in individuals and organizations, founded by Enzo Pasqualetti, a Master in Neuroscience from UFABC, Bachelor in Economics from FAAP, and certified in Medical Neuroscience from Duke University.',
      imageAlt: 'Enzo Pasqualetti, founder of Instituto EZ',
    },
    purpose: {
      title: 'Our Purpose',
      body: 'Helping people live with more clarity and stability, caring for mental health with science and sensitivity. Supporting companies in creating healthier, more efficient environments through analysis, method, and direction.',
    },
    methodology: {
      title: 'Exclusive Methodology',
      body: 'At Instituto EZ, the methodology was created to generate clarity where there is weight, confusion, and overload — both for individuals and within companies. In organizations, we apply neuroanalytic systems that turn perception into mathematical data, revealing real patterns of behavior, efficiency, and performance.',
      imageAlt: 'Instituto EZ - purpose and vision',
    },
    offerings: {
      eyebrow: 'What we offer',
      title: 'Solutions designed for real impact',
      subtitle: 'Structured processes to elevate results with method and consistency.',
      items: [
        {
          title: 'Individual Sessions',
          description:
            'Personalized sessions focused on mental health care, clarity, and emotional balance.',
        },
        {
          title: 'Mentoring & Advisory',
          description:
            'Strategic support for companies that need direction, stronger decisions, and consistent execution.',
        },
        {
          title: 'Neuroanalytic System',
          description:
            'Turns perception into clear mathematical data, revealing real patterns of behavior and performance.',
        },
        {
          title: 'Talks & Workshops',
          description:
            'Dynamic, applicable sessions on neuroscience, human behavior, and mental health.',
        },
        {
          title: 'Immersion',
          description: 'An in-person gathering for inner reconnection, clarity, and direction.',
        },
        {
          title: 'Ebooks & Digital Content',
          description:
            'Content connecting neuroscience, emotional intelligence, mental health, and finance.',
        },
      ],
    },
    closing: {
      title: 'Ready to Take the Next Step?',
      body: 'Clarity isn’t luck, it’s method. At Instituto EZ you’ll find not just science, but a path built with meaning and humanity.',
      cta: 'Talk to the Institute',
    },
  },
  es: {
    hero: {
      title: 'Instituto del Comportamiento Humano e Innovación EZ',
      subtitle:
        'Donde la ciencia se convierte en dirección y la dirección en resultado. Transformando mentes y negocios hace más de 15 años.',
      cta: 'Hablar con el Instituto',
    },
    history: {
      eyebrow: 'Nuestra Historia',
      title: 'Más de 15 años integrando ciencia y transformación',
      body: 'El Instituto EZ nació de la integración entre economía y neurociencia, junto al comportamiento humano y la innovación. Fundado por Enzo Pasqualetti, Máster en Neurociencia por la UFABC, Licenciado en Ciencias Económicas por la FAAP y certificado en Medical Neuroscience por Duke University.',
      imageAlt: 'Enzo Pasqualetti, fundador del Instituto EZ',
    },
    purpose: {
      title: 'Nuestro Propósito',
      body: 'Ayudar a las personas a vivir con más claridad y estabilidad, cuidando la salud mental con ciencia y sensibilidad. Apoyar a las empresas a crear ambientes más saludables y eficientes.',
    },
    methodology: {
      title: 'Metodología Exclusiva',
      body: 'En el Instituto EZ, la metodología fue creada para generar claridad donde hoy existe peso, confusión y sobrecarga. En las organizaciones, aplicamos sistemas neuroanalíticos que transforman la percepción en datos matemáticos.',
      imageAlt: 'Instituto EZ - propósito y visión',
    },
    offerings: {
      eyebrow: 'Qué ofrecemos',
      title: 'Soluciones pensadas para un impacto real',
      subtitle: 'Procesos estructurados para elevar resultados con método y consistencia.',
      items: [
        {
          title: 'Atenciones Individuales',
          description:
            'Sesiones personalizadas enfocadas en el cuidado de la salud mental y el equilibrio emocional.',
        },
        {
          title: 'Mentoría & Asesoría',
          description:
            'Acompañamiento estratégico para empresas que necesitan dirección y ejecución consistente.',
        },
        {
          title: 'Sistema Neuroanalítico',
          description:
            'Transforma la percepción en datos matemáticos claros, revelando patrones reales de comportamiento.',
        },
        {
          title: 'Charlas & Workshops',
          description:
            'Encuentros dinámicos sobre neurociencia, comportamiento humano y salud mental.',
        },
        {
          title: 'Inmersión',
          description: 'Un encuentro presencial para la reconexión interna, claridad y dirección.',
        },
        {
          title: 'Ebooks y Contenido Digital',
          description:
            'Contenidos que unen neurociencia, inteligencia emocional, salud mental y finanzas.',
        },
      ],
    },
    closing: {
      title: '¿Listo para Dar el Próximo Paso?',
      body: 'La claridad no es suerte, es método. En el Instituto EZ encontrarás no solo ciencia, sino un camino construido con sentido y humanidad.',
      cta: 'Hablar con el Instituto',
    },
  },
}
