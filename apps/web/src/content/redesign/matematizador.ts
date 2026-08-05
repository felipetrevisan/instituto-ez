import type { Locale } from 'next-intl'
import type { RedesignMatematizadorContent } from './types'

/**
 * "Sistema Neuroanalítico" / Matematizador page copy. pt is the real
 * content from the live site's landingPage doc (key: "mathematizer").
 * en/es are draft translations — the live site has no real en/es content
 * for this page yet.
 */
export const redesignMatematizadorContent: Record<Locale, RedesignMatematizadorContent> = {
  pt: {
    hero: {
      title: 'Transforme a Intuição em',
      highlight: 'Precisão',
      description:
        'Os Matematizadores são sistemas neuroanalíticos que traduzem o comportamento e os processos da sua empresa em métricas reais. Clareza, direção e estratégia em números.',
      cta: 'Quero o Diagnóstico Completo',
      imageAlt: 'Sistema neuroanalítico Matematizador',
    },
    whatIs: {
      eyebrow: 'Sistema Neuroanalítico',
      title: 'O que é um Matematizador',
      subtext:
        'Ser neuroanalítico é unir a precisão da matemática à leitura do comportamento humano, transformando sensações em números e oferecendo clareza profunda para a tomada de decisão.',
      paragraphs: [
        'Mais do que uma avaliação, é um sistema completo de mensuração de eficiência humana e estrutural, desenvolvido para transformar percepções subjetivas, como clima, motivação, estresse e sinergia entre equipes, em informações objetivas e interpretáveis.',
        'O Matematizador é composto por ferramentas neuroanalíticas, cada uma criada para atender a uma necessidade específica da empresa. O Matematizador Empresarial avalia estrutura e clima organizacional. O Matematizador de Processos identifica gargalos e ineficiências operacionais. O Matematizador Administrativo analisa gestão, direção e coerência estratégica. O Matematizador Pessoal investiga bem-estar e motivação individual.',
      ],
      imageAlt: 'Leitura neuroanalítica de decisão empresarial',
    },
    types: {
      title: 'Os 4 Matematizadores',
      items: [
        {
          title: 'Matematizador Empresarial',
          problem: 'Desconexão entre áreas, falhas de comunicação e liderança sem clareza',
          action:
            'Mede engajamento, estresse, propósito e sinergia entre setores, convertendo o clima em indicadores concretos',
          result: 'Decisões rápidas, embasadas e estratégicas',
        },
        {
          title: 'Matematizador de Processos',
          problem: 'Retrabalho, gargalos e burocracia',
          action: 'Mede os processos, integra setores e quantifica a eficiência operacional',
          result: 'Operação fluida e previsível, com redução de desperdícios',
        },
        {
          title: 'Matematização Administrativa',
          problem: 'Decisões imprecisas, falta de coerência e ruídos na liderança',
          action: 'Avalia gestão, finanças e coerência entre estratégia e execução',
          result: 'Direção sólida e lógica, com domínio sobre o futuro da empresa',
        },
        {
          title: 'Matematização Pessoal',
          problem: 'Colaboradores desmotivados, estresse e desconexão',
          action:
            'Mede saúde emocional e propósito individual, correlacionando com desempenho coletivo',
          result: 'Equipes equilibradas, produtivas e alinhadas à cultura da empresa',
        },
      ],
    },
    whyNeed: {
      title: 'Toda estratégia precisa de um mapa. O seu começa com dados reais.',
      subheading:
        'As empresas não falham por falta de vontade, falham por falta de clareza. Enquanto muitas decidem no escuro, os Matematizadores oferecem uma leitura neuroanalítica e matemática do sistema empresarial, mostrando onde estão as falhas invisíveis, as oportunidades de ganho e o real potencial de crescimento.',
      cta: 'Quero clareza sobre meu negócio',
      imageAlt: 'Mapa estratégico orientado por dados',
    },
    benefits: {
      title: 'Benefícios e Diferenciais',
      items: [
        'Diagnóstico completo em até 3 semanas',
        'Respostas anônimas para garantir sinceridade nas análises',
        'Gráficos e indicadores matemáticos claros',
        'Parâmetros de Precisão',
        'Relatório executivo com interpretação neuroanalítica',
        'Metodologia validada e resultados mensuráveis',
      ],
    },
    closing: {
      title: 'A hora de medir o invisível é agora',
      text: 'Você já tem metas, planos e vontade. O que falta são dados reais que mostrem onde o sistema da sua empresa está perdendo energia. Sem essa clareza, qualquer estratégia se transforma em tentativa, e tentar custa caro. O Matematizador é o divisor entre administrar por instinto e liderar com ciência. Ele transforma percepções em dados objetivos e entrega a precisão necessária para mostrar exatamente onde agir para multiplicar resultados.',
      footer: 'Pare de gerir no escuro. Comece a decidir com base em verdade matemática.',
      cta: 'Solicitar Diagnóstico',
    },
  },
  en: {
    hero: {
      title: 'Turn Intuition Into',
      highlight: 'Precision',
      description:
        'The Mathematizers are neuroanalytic systems that translate your company’s behavior and processes into real metrics. Clarity, direction, and strategy in numbers.',
      cta: 'I Want the Full Diagnostic',
      imageAlt: 'Mathematizer neuroanalytic system',
    },
    whatIs: {
      eyebrow: 'Neuroanalytic System',
      title: 'What Is a Mathematizer',
      subtext:
        'Being neuroanalytic means joining the precision of mathematics with the reading of human behavior, turning perceptions into numbers and offering deep clarity for decision-making.',
      paragraphs: [
        'More than an assessment, it is a complete system for measuring human and structural efficiency, built to turn subjective perceptions — climate, motivation, stress, team synergy — into objective, interpretable information.',
        'The Mathematizer is made up of neuroanalytic tools, each built for a specific company need. The Business Mathematizer assesses structure and organizational climate. The Process Mathematizer identifies operational bottlenecks and inefficiencies. The Administrative Mathematizer analyzes management, direction, and strategic coherence. The Personal Mathematizer looks at individual well-being and motivation.',
      ],
      imageAlt: 'Neuroanalytic reading of business decisions',
    },
    types: {
      title: 'The 4 Mathematizers',
      items: [
        {
          title: 'Business Mathematizer',
          problem: 'Disconnected teams, communication breakdowns, unclear leadership',
          action:
            'Measures engagement, stress, purpose, and cross-team synergy, turning climate into concrete indicators',
          result: 'Fast, informed, strategic decisions',
        },
        {
          title: 'Process Mathematizer',
          problem: 'Rework, bottlenecks, and bureaucracy',
          action: 'Measures processes, integrates teams, and quantifies operational efficiency',
          result: 'Smooth, predictable operations with less waste',
        },
        {
          title: 'Administrative Mathematization',
          problem: 'Imprecise decisions, incoherence, leadership noise',
          action: 'Assesses management, finances, and strategy-execution coherence',
          result: 'Solid, logical direction with control over the company’s future',
        },
        {
          title: 'Personal Mathematization',
          problem: 'Unmotivated employees, stress, and disconnection',
          action:
            'Measures emotional health and individual purpose, correlating it with collective performance',
          result: 'Balanced, productive teams aligned with the company culture',
        },
      ],
    },
    whyNeed: {
      title: 'Every strategy needs a map. Yours starts with real data.',
      subheading:
        'Companies don’t fail from lack of will — they fail from lack of clarity. While many decide in the dark, the Mathematizers offer a neuroanalytic, mathematical reading of the business system, showing invisible failures, hidden gains, and real growth potential.',
      cta: 'I Want Clarity on My Business',
      imageAlt: 'Data-driven strategic map',
    },
    benefits: {
      title: 'Benefits & Differentiators',
      items: [
        'Full diagnostic in up to 3 weeks',
        'Anonymous answers to ensure honest analysis',
        'Clear mathematical charts and indicators',
        'Precision parameters',
        'Executive report with neuroanalytic interpretation',
        'Validated methodology, measurable results',
      ],
    },
    closing: {
      title: 'The time to measure the invisible is now',
      text: 'You already have goals, plans, and will. What’s missing is real data showing where your company’s system is losing energy. Without that clarity, any strategy becomes a guess — and guessing is expensive. The Mathematizer is the line between running on instinct and leading with science. It turns perceptions into objective data and delivers the precision to know exactly where to act.',
      footer: 'Stop managing in the dark. Start deciding on mathematical truth.',
      cta: 'Request Diagnostic',
    },
  },
  es: {
    hero: {
      title: 'Transforma la Intuición en',
      highlight: 'Precisión',
      description:
        'Los Matematizadores son sistemas neuroanalíticos que traducen el comportamiento y los procesos de tu empresa en métricas reales. Claridad, dirección y estrategia en números.',
      cta: 'Quiero el Diagnóstico Completo',
      imageAlt: 'Sistema neuroanalítico Matematizador',
    },
    whatIs: {
      eyebrow: 'Sistema Neuroanalítico',
      title: 'Qué es un Matematizador',
      subtext:
        'Ser neuroanalítico es unir la precisión de la matemática con la lectura del comportamiento humano, transformando percepciones en números y ofreciendo claridad profunda para la toma de decisiones.',
      paragraphs: [
        'Más que una evaluación, es un sistema completo de medición de eficiencia humana y estructural, desarrollado para transformar percepciones subjetivas, como clima, motivación, estrés y sinergia entre equipos, en información objetiva e interpretable.',
        'El Matematizador está compuesto por herramientas neuroanalíticas, cada una creada para una necesidad específica de la empresa. El Matematizador Empresarial evalúa estructura y clima organizacional. El Matematizador de Procesos identifica cuellos de botella e ineficiencias operativas. El Matematizador Administrativo analiza gestión, dirección y coherencia estratégica. El Matematizador Personal investiga bienestar y motivación individual.',
      ],
      imageAlt: 'Lectura neuroanalítica de decisiones empresariales',
    },
    types: {
      title: 'Los 4 Matematizadores',
      items: [
        {
          title: 'Matematizador Empresarial',
          problem: 'Desconexión entre áreas, fallas de comunicación y liderazgo sin claridad',
          action:
            'Mide compromiso, estrés, propósito y sinergia entre sectores, convirtiendo el clima en indicadores concretos',
          result: 'Decisiones rápidas, fundamentadas y estratégicas',
        },
        {
          title: 'Matematizador de Procesos',
          problem: 'Retrabajo, cuellos de botella y burocracia',
          action: 'Mide los procesos, integra sectores y cuantifica la eficiencia operativa',
          result: 'Operación fluida y previsible, con reducción de desperdicios',
        },
        {
          title: 'Matematización Administrativa',
          problem: 'Decisiones imprecisas, falta de coherencia y ruido en el liderazgo',
          action: 'Evalúa gestión, finanzas y coherencia entre estrategia y ejecución',
          result: 'Dirección sólida y lógica, con dominio sobre el futuro de la empresa',
        },
        {
          title: 'Matematización Personal',
          problem: 'Colaboradores desmotivados, estrés y desconexión',
          action:
            'Mide salud emocional y propósito individual, correlacionándolo con el desempeño colectivo',
          result: 'Equipos equilibrados, productivos y alineados con la cultura de la empresa',
        },
      ],
    },
    whyNeed: {
      title: 'Toda estrategia necesita un mapa. El tuyo empieza con datos reales.',
      subheading:
        'Las empresas no fallan por falta de voluntad, fallan por falta de claridad. Mientras muchas deciden a oscuras, los Matematizadores ofrecen una lectura neuroanalítica y matemática del sistema empresarial, mostrando fallas invisibles, oportunidades de ganancia y el potencial real de crecimiento.',
      cta: 'Quiero claridad sobre mi negocio',
      imageAlt: 'Mapa estratégico basado en datos',
    },
    benefits: {
      title: 'Beneficios y Diferenciales',
      items: [
        'Diagnóstico completo en hasta 3 semanas',
        'Respuestas anónimas para garantizar sinceridad en los análisis',
        'Gráficos e indicadores matemáticos claros',
        'Parámetros de Precisión',
        'Informe ejecutivo con interpretación neuroanalítica',
        'Metodología validada y resultados medibles',
      ],
    },
    closing: {
      title: 'La hora de medir lo invisible es ahora',
      text: 'Ya tienes metas, planes y voluntad. Lo que falta son datos reales que muestren dónde el sistema de tu empresa está perdiendo energía. Sin esa claridad, cualquier estrategia se convierte en un intento, y intentar cuesta caro. El Matematizador es la línea entre administrar por instinto y liderar con ciencia. Transforma percepciones en datos objetivos y entrega la precisión necesaria para saber exactamente dónde actuar.',
      footer: 'Deja de gestionar a oscuras. Empieza a decidir con base en verdad matemática.',
      cta: 'Solicitar Diagnóstico',
    },
  },
}
