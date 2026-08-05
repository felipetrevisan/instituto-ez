import type { Locale } from 'next-intl'
import type { RedesignMentoriaContent } from './types'

/** Real content from the live site (/pt/mentoria-e-assessoria). en/es are draft translations. */
export const redesignMentoriaContent: Record<Locale, RedesignMentoriaContent> = {
  pt: {
    hero: {
      eyebrow: 'Mentoria Estratégica',
      title: 'Mentoria e Assessoria Estratégica',
      subtitle:
        'Evolução integral com clareza, estratégia e resultados reais. Um processo completo que transforma a forma de pensar, decidir e executar.',
      cta: 'Iniciar Jornada Estratégica',
      ctaSecondary: 'Falar com o Instituto',
      imageAlt: 'Mentoria estratégica no Instituto EZ',
    },
    intro: {
      title: 'Transforme a Gestão da Sua Empresa com Clareza e Direcionamento Estratégico',
      paragraphs: [
        'A Mentoria e Assessoria Estratégica do Instituto EZ é um processo completo de evolução empresarial que combina clareza, estratégia e execução com alto nível de precisão. Seu propósito é fortalecer a tomada de decisão, elevar a performance das lideranças e criar uma estrutura clara para que a empresa avance com coerência, consistência e resultados mensuráveis.',
        'Não se trata de conselhos genéricos ou fórmulas prontas. É um acompanhamento estratégico fundamentado em neurociência, economia comportamental e planejamento empresarial, construído para aprimorar a forma como gestores, diretores e equipes analisam cenários, definem prioridades e executam ações com impacto real no negócio.',
        'Os encontros podem ser presenciais ou online, com duração de até 2 horas, em frequência quinzenal ou ajustada ao ritmo ideal da organização. Entre as sessões, a empresa conta com suporte contínuo por e-mail ou WhatsApp.',
      ],
    },
    steps: {
      eyebrow: 'Etapas do Método',
      title: 'Um processo estruturado em etapas integradas',
      subtitle: 'Cada uma com objetivo específico e evolução mensurável.',
      items: [
        {
          number: '01',
          title: 'Diagnóstico Profundo e Alinhamento de Direção',
          description:
            'Imersão completa no momento atual, com análise detalhada de padrões, bloqueios, potencial e metas.',
        },
        {
          number: '02',
          title: 'Planejamento Estratégico Personalizado',
          description:
            'Criação de um plano individualizado que organiza decisões de curto, médio e longo prazo.',
        },
        {
          number: '03',
          title: 'Ativação de Mindset e Novos Padrões',
          description:
            'Implementação de novas formas de agir, pensar e organizar a rotina, eliminando hábitos que limitam.',
        },
        {
          number: '04',
          title: 'Execução Guiada e Acompanhamento Constante',
          description:
            'Transformação do plano em prática com ajustes em tempo real e feedback contínuo.',
        },
        {
          number: '05',
          title: 'Exercícios Neurocognitivos Aplicados',
          description:
            'Práticas cientificamente embasadas para clareza mental, regulação emocional e fortalecimento de raciocínio.',
        },
        {
          number: '06',
          title: 'Revisão e Validação de Resultados',
          description:
            'Análise dos primeiros resultados alcançados, refinamento das estratégias e reorganização de prioridades.',
        },
        {
          number: '07',
          title: 'Consolidação de Habilidades e Expansão de Visão',
          description:
            'Integração plena das competências desenvolvidas e autonomia decisória crescente.',
        },
        {
          number: '08',
          title: 'Avaliação Final e Continuidade Estratégica',
          description:
            'Entrega consolidada do progresso alcançado, com indicadores claros e plano de continuidade.',
        },
      ],
    },
    audience: {
      title: 'Quando a Empresa Precisa Organizar Processos e Avançar de Verdade',
      paragraphs: [
        'A Mentoria e Assessoria Estratégica é destinada a empresas que precisam de clareza operacional, direção estratégica e uma metodologia capaz de organizar processos de forma objetiva e mensurável.',
        'O programa atende equipes de Recursos Humanos, gestores, diretores, líderes de área, coordenadores e profissionais que estão assumindo novas responsabilidades ou conduzindo mudanças internas.',
        'Seja para expansão, reestruturação, padronização de processos, transição de liderança ou ajuste fino da performance operacional, essa jornada entrega uma visão estratégica integrada e evolução contínua.',
      ],
    },
    results: {
      title: 'Resultados esperados',
      subtitle:
        'Evolução empresarial com clareza, estratégia e resultados reais. Um processo completo que transforma a forma como a empresa pensa, decide e executa.',
      items: [
        'Clareza profunda sobre direção, prioridades e estratégias de execução',
        'Estrutura sólida para tomar decisões com precisão e segurança',
        'Eliminação de desperdícios de energia, tempo e recursos',
        'Reorganização mental e emocional para alta performance sustentável',
        'Avanço consistente em todas as frentes que impactam a empresa',
        'Capacidade de liderar com visão estratégica e inteligência emocional',
        'Implementação de processos claros que reduzem retrabalho',
      ],
      stats: [
        { value: '15+', label: 'Anos de Experiência' },
        { value: 'Resultados+', label: 'Mensuráveis e Reais' },
        { value: '100%', label: 'Método Comprovado' },
        { value: 'Execução', label: 'De Alto Impacto' },
      ],
      imageAlt: 'Resultados da mentoria estratégica',
    },
    finalCta: {
      title: 'Decida Elevar Sua Empresa Para o Próximo Nível Agora',
      body: 'A estagnação custa caro. Avanço exige método, clareza e direção executiva. Se a sua empresa precisa organizar processos, fortalecer a liderança e agir com precisão, este é o momento de transformar intenção em estratégia aplicada.',
      cta: 'Começar Agora',
    },
  },
  en: {
    hero: {
      eyebrow: 'Strategic Mentoring',
      title: 'Strategic Mentoring & Advisory',
      subtitle:
        'Full evolution with clarity, strategy, and real results. A complete process that transforms how you think, decide, and execute.',
      cta: 'Start Your Strategic Journey',
      ctaSecondary: 'Talk to the Institute',
      imageAlt: 'Strategic mentoring at Instituto EZ',
    },
    intro: {
      title: 'Transform Your Company’s Management with Clarity and Strategic Direction',
      paragraphs: [
        'Instituto EZ’s Strategic Mentoring & Advisory is a complete business evolution process combining clarity, strategy, and execution with a high level of precision.',
        'It is not generic advice or ready-made formulas — it’s strategic support grounded in neuroscience, behavioral economics, and business planning.',
        'Sessions can be in-person or online, up to 2 hours, biweekly or adjusted to the organization’s ideal pace, with continuous support between sessions.',
      ],
    },
    steps: {
      eyebrow: 'Method Stages',
      title: 'A structured process of integrated stages',
      subtitle: 'Each with a specific goal and measurable progress.',
      items: [
        {
          number: '01',
          title: 'Deep Diagnosis and Direction Alignment',
          description:
            'A complete immersion into the current moment, analyzing patterns, blockers, and goals.',
        },
        {
          number: '02',
          title: 'Personalized Strategic Planning',
          description:
            'Building an individualized plan organizing short, medium, and long-term decisions.',
        },
        {
          number: '03',
          title: 'Mindset Activation and New Patterns',
          description: 'Implementing new ways of acting and thinking, eliminating limiting habits.',
        },
        {
          number: '04',
          title: 'Guided Execution and Constant Follow-up',
          description:
            'Turning the plan into practice with real-time adjustments and continuous feedback.',
        },
        {
          number: '05',
          title: 'Applied Neurocognitive Exercises',
          description: 'Science-based practices for mental clarity and emotional regulation.',
        },
        {
          number: '06',
          title: 'Results Review and Validation',
          description: 'Analyzing first results, refining strategies and priorities.',
        },
        {
          number: '07',
          title: 'Skill Consolidation and Expanded Vision',
          description: 'Full integration of developed skills and growing decision-making autonomy.',
        },
        {
          number: '08',
          title: 'Final Assessment and Strategic Continuity',
          description:
            'Consolidated delivery of progress with clear indicators and a continuity plan.',
        },
      ],
    },
    audience: {
      title: 'When a Company Needs to Organize Processes and Truly Move Forward',
      paragraphs: [
        'Strategic Mentoring & Advisory is for companies that need operational clarity, strategic direction, and a measurable methodology.',
        'The program serves HR teams, managers, directors, and professionals taking on new responsibilities or leading internal change.',
        'Whether for expansion, restructuring, process standardization, or leadership transition, this journey delivers integrated strategic vision.',
      ],
    },
    results: {
      title: 'Expected Results',
      subtitle: 'Business evolution with clarity, strategy, and real results.',
      items: [
        'Deep clarity on direction, priorities, and execution strategies',
        'Solid structure for confident, precise decisions',
        'Elimination of wasted energy, time, and resources',
        'Mental and emotional reorganization for sustainable high performance',
        'Consistent progress across every front that impacts the company',
        'Ability to lead with strategic vision and emotional intelligence',
      ],
      stats: [
        { value: '15+', label: 'Years of Experience' },
        { value: 'Results+', label: 'Measurable and Real' },
        { value: '100%', label: 'Proven Method' },
        { value: 'Execution', label: 'High Impact' },
      ],
      imageAlt: 'Strategic mentoring results',
    },
    finalCta: {
      title: 'Decide to Elevate Your Company Now',
      body: 'Stagnation is costly. Progress requires method, clarity, and executive direction.',
      cta: 'Get Started Now',
    },
  },
  es: {
    hero: {
      eyebrow: 'Mentoría Estratégica',
      title: 'Mentoría y Asesoría Estratégica',
      subtitle:
        'Evolución integral con claridad, estrategia y resultados reales. Un proceso completo que transforma la forma de pensar, decidir y ejecutar.',
      cta: 'Iniciar Jornada Estratégica',
      ctaSecondary: 'Hablar con el Instituto',
      imageAlt: 'Mentoría estratégica en el Instituto EZ',
    },
    intro: {
      title: 'Transforma la Gestión de tu Empresa con Claridad y Dirección Estratégica',
      paragraphs: [
        'La Mentoría y Asesoría Estratégica del Instituto EZ es un proceso completo de evolución empresarial que combina claridad, estrategia y ejecución con alta precisión.',
        'No se trata de consejos genéricos, sino de un acompañamiento estratégico basado en neurociencia y economía conductual.',
        'Los encuentros pueden ser presenciales u online, con soporte continuo entre sesiones.',
      ],
    },
    steps: {
      eyebrow: 'Etapas del Método',
      title: 'Un proceso estructurado en etapas integradas',
      subtitle: 'Cada una con un objetivo específico y evolución medible.',
      items: [
        {
          number: '01',
          title: 'Diagnóstico Profundo y Alineación de Dirección',
          description: 'Inmersión completa en el momento actual, con análisis de patrones y metas.',
        },
        {
          number: '02',
          title: 'Planificación Estratégica Personalizada',
          description:
            'Creación de un plan individualizado que organiza decisiones a corto, medio y largo plazo.',
        },
        {
          number: '03',
          title: 'Activación de Mentalidad y Nuevos Patrones',
          description: 'Implementación de nuevas formas de actuar y pensar.',
        },
        {
          number: '04',
          title: 'Ejecución Guiada y Seguimiento Constante',
          description: 'Transformación del plan en práctica con ajustes en tiempo real.',
        },
        {
          number: '05',
          title: 'Ejercicios Neurocognitivos Aplicados',
          description: 'Prácticas científicas para la claridad mental y regulación emocional.',
        },
        {
          number: '06',
          title: 'Revisión y Validación de Resultados',
          description: 'Análisis de los primeros resultados y refinamiento de estrategias.',
        },
        {
          number: '07',
          title: 'Consolidación de Habilidades y Expansión de Visión',
          description: 'Integración plena de las competencias desarrolladas.',
        },
        {
          number: '08',
          title: 'Evaluación Final y Continuidad Estratégica',
          description: 'Entrega consolidada del progreso con indicadores claros.',
        },
      ],
    },
    audience: {
      title: 'Cuando la Empresa Necesita Organizar Procesos y Avanzar de Verdad',
      paragraphs: [
        'La Mentoría y Asesoría Estratégica está destinada a empresas que necesitan claridad operativa y dirección estratégica.',
        'El programa atiende a equipos de RR.HH., gerentes, directores y profesionales que asumen nuevas responsabilidades.',
        'Ya sea para expansión, reestructuración o transición de liderazgo, esta jornada entrega una visión estratégica integrada.',
      ],
    },
    results: {
      title: 'Resultados Esperados',
      subtitle: 'Evolución empresarial con claridad, estrategia y resultados reales.',
      items: [
        'Claridad profunda sobre dirección, prioridades y estrategias de ejecución',
        'Estructura sólida para tomar decisiones con precisión y seguridad',
        'Eliminación de desperdicios de energía, tiempo y recursos',
        'Reorganización mental y emocional para un alto desempeño sostenible',
        'Avance consistente en todos los frentes que impactan la empresa',
      ],
      stats: [
        { value: '15+', label: 'Años de Experiencia' },
        { value: 'Resultados+', label: 'Medibles y Reales' },
        { value: '100%', label: 'Método Comprobado' },
        { value: 'Ejecución', label: 'De Alto Impacto' },
      ],
      imageAlt: 'Resultados de la mentoría estratégica',
    },
    finalCta: {
      title: 'Decide Elevar tu Empresa al Siguiente Nivel Ahora',
      body: 'El estancamiento cuesta caro. Avanzar exige método, claridad y dirección ejecutiva.',
      cta: 'Comenzar Ahora',
    },
  },
}
