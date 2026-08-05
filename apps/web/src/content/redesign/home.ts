import type { Locale } from 'next-intl'
import type { RedesignHomeContent } from './types'

/**
 * Home page copy for the redesign. pt is the real content from the live
 * site (/pt/home, Sanity-backed). en/es are draft translations — the live
 * site itself has no real en/es content yet, so these are shortened.
 */
export const redesignHomeContent: Record<Locale, RedesignHomeContent> = {
  pt: {
    hero: {
      eyebrow: 'Behavioral Architecture',
      title: 'Instituto do',
      highlight: 'Comportamento Humano e Inovação EZ',
      subtitle: 'Onde neurociência, comportamento humano e estratégia se integram.',
      cta: 'Falar com o Instituto EZ',
    },
    neurocognitive: {
      eyebrow: 'Atendimentos Individuais',
      title: 'Exercícios Neurocognitivos:',
      highlight: 'Aplicações práticas para a Saúde Mental',
      paragraphs: [
        'Exercícios neurocognitivos estruturados para promover a regulação de desequilíbrios mentais e emocionais, como estresse crônico, falta de direção, ansiedade, depressão, burnout e outros padrões que comprometem o equilíbrio psicológico e a clareza mental.',
        'Os efeitos tornam-se perceptíveis já na primeira sessão, com alterações observáveis nos padrões mentais e emocionais. Essas mudanças impactam diretamente a clareza nas decisões e a qualidade de vida.',
        'O método é reconhecido por profissionais da área da saúde como recurso complementar no cuidado à saúde mental. Cada processo é estruturado de forma individualizada, com anamnese criteriosa e condução sob responsabilidade técnica do neurocientista Enzo Pasqualetti.',
      ],
      stats: [
        { value: '15+', label: 'Anos de Experiência' },
        { value: '100%', label: 'Protocolo Estruturado' },
      ],
      benefits: [
        'Clareza Emocional e Foco Cognitivo',
        'Redução da Ansiedade e da Sobrecarga Mental',
        'Tomada de Decisão mais Clara e Segura',
        'Cuidado Integrado em Saúde Mental',
        'Primeira Consulta com Avaliação Neurocognitiva Completa',
      ],
      cta: 'Agendar Avaliação Inicial',
      imageAlt: 'Sessão de exercícios neurocognitivos',
    },
    testimonials: {
      title: 'Depoimentos',
      items: [
        {
          quote:
            'Há cerca de 3 anos, desesperançado devido à dependência química, marquei uma reunião com Enzo sugerida por um amigo. Já tinha passado por inúmeras tentativas de cura, mas ao conhecer Enzo, encontrei esperança. Hoje, limpo por 2 anos e 5 meses, sinto que houve uma mudança neurológica.',
          name: 'André',
          role: 'Representante Comercial',
        },
        {
          quote:
            'A busca pelo autoconhecimento e transformação inicia quando enfrentamos nossos medos, deixamos a zona de conforto e encaramos a realidade. Essa jornada foi facilitada pelo Instituto Ez, especialmente seu fundador, Enzo Pasqualetti. Agradeço por sua ajuda fundamental!',
          name: 'Fernando Sugiyama',
          role: 'Empresário',
        },
        {
          quote:
            'Conhecer o Enzo me ajudou muito! Em todas as suas consultas, pude me sentir mais capacitado, mais seguro e que tudo é possível de se alcançar. Suas consultas mudaram a minha vida, e serei eternamente grato por conhecê-lo.',
          name: 'Leonardo Silva Brene',
          role: 'Professor Hospitalar',
        },
        {
          quote:
            'Após exames e diagnóstico psiquiátrico, vivi várias crises de síndrome do pânico. Conheci Enzo, começamos a trabalhar juntos semanalmente, reduzindo gradualmente as sensações de pânico. Graças a ele, superei o medo e retomei minha vida social.',
          name: 'Adriana Taguti',
          role: 'Cabeleireira',
        },
        {
          quote:
            'Minha jornada contra a depressão teve uma virada significativa quando descobri o Instituto Ez. O acolhimento e a expertise do Neurocientista Enzo Pasqualetti foram fundamentais para minha recuperação.',
          name: 'Ana Silva',
          role: 'Professora',
        },
        {
          quote:
            'Como engenheiro, sempre busquei soluções lógicas, e foi incrível encontrar uma abordagem científica para enfrentar a ansiedade. O Instituto Ez tornou-se meu refúgio seguro durante esse processo de autodescoberta.',
          name: 'Carlos Oliveira',
          role: 'Engenheiro',
        },
      ],
    },
    mentoring: {
      eyebrow: 'Atendimentos Personalizados',
      title: 'Mentoria & Assessoria',
      highlight: 'Estratégica',
      intro:
        'Acompanhamento estratégico para empresas que buscam desenvolvimento em nível aprofundado, com monitoramento contínuo e ajustes orientados por critérios técnicos.',
      cards: [
        {
          icon: 'brain',
          title: 'Desenvolvimento Comportamental',
          description:
            'Aplicação de exercícios neurocognitivos avançados para reorganização de padrões mentais e comportamentais, fortalecendo autonomia e autorregulação.',
        },
        {
          icon: 'trending-up',
          title: 'Economia Comportamental',
          description:
            'Análise de vieses, heurísticas e padrões decisórios que influenciam escolhas pessoais, financeiras e organizacionais.',
        },
        {
          icon: 'bar-chart',
          title: 'Métricas de Desempenho',
          description:
            'Avaliação objetiva de progresso, definição de indicadores estratégicos e suporte à tomada de decisão orientada por dados.',
        },
        {
          icon: 'building',
          title: 'Estruturação Organizacional',
          description:
            'Organização estratégica de processos e definição de estruturas operacionais, com foco em eficiência e crescimento sustentável.',
        },
        {
          icon: 'heart-handshake',
          title: 'Gestão Emocional e Resiliência',
          description:
            'Desenvolvimento de estabilidade emocional para lidar com pressão, incerteza e tomada de decisão em ambientes de alta exigência.',
        },
        {
          icon: 'compass',
          title: 'Inteligência Estratégica',
          description:
            'Integração de análise, visão sistêmica e leitura de cenários para otimizar decisões e resultados organizacionais.',
        },
      ],
      cta: 'Potencialize a Mente, Comportamento e Decisão – Saiba Mais',
    },
    business: {
      eyebrow: 'Produto Empresarial',
      title: 'Transforme Intuição em',
      highlight: 'Precisão',
      description:
        'O Sistema Neuroanalítico converte percepções subjetivas em métricas objetivas, permitindo que a empresa identifique com clareza o que funciona, o que compromete desempenho e onde concentrar ajustes estratégicos. Em até 3 semanas, entregamos um diagnóstico técnico que orienta decisões estratégicas e fortalece a performance da equipe.',
      stats: [
        { value: '+90%', label: 'Precisão nas Métricas' },
        { value: '100%', label: 'Tomada de Decisão Segura' },
      ],
      benefits: [
        'Sistema Neuroanalítico Empresarial',
        'Modelagem Matemática Aplicada',
        'Clareza de Processos e Performance',
        'Decisões Orientadas por Evidências',
        'Diagnóstico Técnico em até 3 Semanas',
      ],
      cta: 'Quero o Diagnóstico Completo',
      imageAlt: 'Gráficos de dados complexos',
    },
    workshops: {
      eyebrow: 'Palestras e Workshops',
      title: 'Transforme sua empresa investindo no potencial das pessoas',
      intro:
        'Levar conhecimento científico atualizado à gestão de pessoas fortalece a estrutura organizacional e qualifica a tomada de decisão em todos os níveis.',
      cards: [
        {
          title: 'Rapport e Neurolinguística Aplicada',
          description:
            'Aplicação de técnicas avançadas de neurolinguística para construção de rapport e condução eficaz de negociações e interações corporativas.',
        },
        {
          title: 'Neurociência do Pensamento Positivo',
          description:
            'Compreensão dos fundamentos neurais que estruturam padrões mentais adaptativos, promovendo regulação emocional e foco atencional.',
        },
        {
          title: 'Saúde Mental no Ambiente Corporativo',
          description:
            'Conteúdo estruturado sobre saúde mental organizacional, em conformidade com as diretrizes atualizadas da NR-1.',
        },
        {
          title: 'Depressão, Ansiedade e Burnout',
          description:
            'Identificação de sinais comportamentais associados à depressão, ansiedade e burnout, com orientação para reconhecimento precoce.',
        },
      ],
      cta: 'Solicitar Proposta para sua Empresa',
    },
    digitalProducts: {
      title: 'Potencialize seu Conhecimento',
      highlight: 'com Nossos Produtos Digitais',
      badge: 'Masterclass Série',
      cardTitle: 'Cérebro, Dinheiro e Riqueza',
      cardDescription:
        'Programas estruturados em módulos que integram neurociência, economia comportamental, psicologia financeira e estratégias de alta performance. O conteúdo aprofunda os mecanismos neurais da tomada de decisão e os vieses que influenciam escolhas econômicas.',
      cta: 'Acessar Masterclasses',
      imageAlt: 'Produtos Digitais',
    },
    immersionTeaser: {
      eyebrow: 'Vivência Presencial',
      title: 'Imersão Despertar da Consciência',
      paragraphs: [
        'Uma experiência presencial de um dia que integra fundamentos da neurociência, espiritualidade e autoconsciência, com práticas voltadas à reorganização emocional e ampliação da clareza interna.',
        'O evento é inter-religioso, aberto a todas as crenças e religiões, oferecendo um ambiente respeitoso e seguro para reflexão e fortalecimento da consciência individual.',
      ],
      cta: 'Conhecer a Imersão',
      imageAlt: 'Imersão Despertar da Consciência',
    },
  },
  en: {
    hero: {
      eyebrow: 'Behavioral Architecture',
      title: 'Institute of',
      highlight: 'Human Behavior and EZ Innovation',
      subtitle: 'Where neuroscience, human behavior, and strategy come together.',
      cta: 'Talk to Instituto EZ',
    },
    neurocognitive: {
      eyebrow: 'Individual Sessions',
      title: 'Neurocognitive Exercises:',
      highlight: 'Practical Applications for Mental Health',
      paragraphs: [
        'Structured neurocognitive exercises to regulate mental and emotional imbalances such as chronic stress, anxiety, depression, and burnout.',
        'Effects become noticeable as early as the first session, with observable shifts in mental and emotional patterns.',
        'Each process is individualized, with a thorough intake and clinical oversight from neuroscientist Enzo Pasqualetti.',
      ],
      stats: [
        { value: '15+', label: 'Years of Experience' },
        { value: '100%', label: 'Structured Protocol' },
      ],
      benefits: [
        'Emotional Clarity and Cognitive Focus',
        'Reduced Anxiety and Mental Overload',
        'Clearer, More Confident Decision-Making',
        'Integrated Mental Health Care',
      ],
      cta: 'Schedule an Initial Assessment',
      imageAlt: 'Neurocognitive exercise session',
    },
    testimonials: {
      title: 'Testimonials',
      items: [
        {
          quote:
            'Getting to know Enzo helped me enormously. In every session I felt more capable and secure, and that anything is achievable.',
          name: 'Leonardo Silva Brene',
          role: 'Hospital Professor',
        },
        {
          quote:
            'My journey against depression turned around when I discovered Instituto EZ. The care and expertise of neuroscientist Enzo Pasqualetti were fundamental to my recovery.',
          name: 'Ana Silva',
          role: 'Teacher',
        },
        {
          quote:
            'As an engineer, I always looked for logical solutions, and it was incredible to find a scientific approach to anxiety.',
          name: 'Carlos Oliveira',
          role: 'Engineer',
        },
      ],
    },
    mentoring: {
      eyebrow: 'Personalized Sessions',
      title: 'Mentoring & Strategic',
      highlight: 'Advisory',
      intro:
        'Strategic support for companies seeking in-depth development, with continuous monitoring and technically-driven adjustments.',
      cards: [
        {
          icon: 'brain',
          title: 'Behavioral Development',
          description:
            'Advanced neurocognitive exercises to reorganize mental and behavioral patterns.',
        },
        {
          icon: 'trending-up',
          title: 'Behavioral Economics',
          description:
            'Analysis of biases and decision patterns influencing personal and organizational choices.',
        },
        {
          icon: 'bar-chart',
          title: 'Performance Metrics',
          description: 'Objective progress assessment and data-driven decision support.',
        },
        {
          icon: 'building',
          title: 'Organizational Structuring',
          description:
            'Strategic process organization focused on efficiency and sustainable growth.',
        },
        {
          icon: 'heart-handshake',
          title: 'Emotional Management & Resilience',
          description:
            'Building emotional stability for high-pressure, high-stakes decision-making.',
        },
        {
          icon: 'compass',
          title: 'Strategic Intelligence',
          description:
            'Integrating analysis and systemic vision to optimize decisions and results.',
        },
      ],
      cta: 'Empower the Mind — Learn More',
    },
    business: {
      eyebrow: 'Enterprise Product',
      title: 'Turn Intuition Into',
      highlight: 'Precision',
      description:
        'The Neuroanalytic System converts subjective perceptions into objective metrics, giving companies clarity on what works and where to focus. Within 3 weeks, we deliver a technical diagnosis that guides strategic decisions.',
      stats: [
        { value: '+90%', label: 'Metric Precision' },
        { value: '100%', label: 'Confident Decision-Making' },
      ],
      benefits: [
        'Enterprise Neuroanalytic System',
        'Applied Mathematical Modeling',
        'Process and Performance Clarity',
        'Evidence-Driven Decisions',
      ],
      cta: 'Get the Full Diagnosis',
      imageAlt: 'Complex data charts',
    },
    workshops: {
      eyebrow: 'Talks and Workshops',
      title: 'Transform your company by investing in people',
      intro:
        'Bringing up-to-date scientific knowledge to people management strengthens the organization and qualifies decision-making at every level.',
      cards: [
        {
          title: 'Rapport and Applied Neurolinguistics',
          description:
            'Advanced neurolinguistic techniques for building rapport and effective negotiation.',
        },
        {
          title: 'The Neuroscience of Positive Thinking',
          description:
            'Understanding the neural foundations of adaptive mental patterns and emotional regulation.',
        },
        {
          title: 'Mental Health in the Workplace',
          description:
            'Structured content on organizational mental health, aligned with current regulations.',
        },
        {
          title: 'Depression, Anxiety, and Burnout',
          description: 'Identifying behavioral signs for early recognition and proper management.',
        },
      ],
      cta: 'Request a Proposal for Your Company',
    },
    digitalProducts: {
      title: 'Level Up Your Knowledge',
      highlight: 'with Our Digital Products',
      badge: 'Masterclass Series',
      cardTitle: 'Brain, Money, and Wealth',
      cardDescription:
        'Modular programs integrating neuroscience, behavioral economics, and financial psychology. Deep dives into the neural mechanisms of decision-making.',
      cta: 'Access Masterclasses',
      imageAlt: 'Digital Products',
    },
    immersionTeaser: {
      eyebrow: 'In-Person Experience',
      title: 'Awakening Consciousness Immersion',
      paragraphs: [
        'A one-day in-person experience integrating neuroscience, spirituality, and self-awareness, with practices for emotional reorganization.',
        'The event is interfaith, open to all beliefs, offering a respectful and safe environment for reflection.',
      ],
      cta: 'Learn About the Immersion',
      imageAlt: 'Awakening Consciousness Immersion',
    },
  },
  es: {
    hero: {
      eyebrow: 'Behavioral Architecture',
      title: 'Instituto del',
      highlight: 'Comportamiento Humano e Innovación EZ',
      subtitle: 'Donde la neurociencia, el comportamiento humano y la estrategia se integran.',
      cta: 'Hablar con el Instituto EZ',
    },
    neurocognitive: {
      eyebrow: 'Atenciones Individuales',
      title: 'Ejercicios Neurocognitivos:',
      highlight: 'Aplicaciones prácticas para la Salud Mental',
      paragraphs: [
        'Ejercicios neurocognitivos estructurados para regular desequilibrios mentales y emocionales como estrés crónico, ansiedad, depresión y burnout.',
        'Los efectos se vuelven perceptibles ya en la primera sesión, con cambios observables en los patrones mentales y emocionales.',
        'Cada proceso es individualizado, con anamnesis rigurosa y conducción bajo responsabilidad técnica del neurocientífico Enzo Pasqualetti.',
      ],
      stats: [
        { value: '15+', label: 'Años de Experiencia' },
        { value: '100%', label: 'Protocolo Estructurado' },
      ],
      benefits: [
        'Claridad Emocional y Enfoque Cognitivo',
        'Reducción de la Ansiedad y la Sobrecarga Mental',
        'Toma de Decisiones más Clara y Segura',
        'Cuidado Integrado de la Salud Mental',
      ],
      cta: 'Agendar Evaluación Inicial',
      imageAlt: 'Sesión de ejercicios neurocognitivos',
    },
    testimonials: {
      title: 'Testimonios',
      items: [
        {
          quote:
            'Conocer a Enzo me ayudó mucho. En cada consulta pude sentirme más capacitado y seguro, y que todo es posible de alcanzar.',
          name: 'Leonardo Silva Brene',
          role: 'Profesor Hospitalario',
        },
        {
          quote:
            'Mi camino contra la depresión tuvo un giro significativo cuando descubrí el Instituto EZ. La contención y experiencia del neurocientífico Enzo Pasqualetti fueron fundamentales.',
          name: 'Ana Silva',
          role: 'Profesora',
        },
        {
          quote:
            'Como ingeniero, siempre busqué soluciones lógicas, y fue increíble encontrar un enfoque científico para enfrentar la ansiedad.',
          name: 'Carlos Oliveira',
          role: 'Ingeniero',
        },
      ],
    },
    mentoring: {
      eyebrow: 'Atenciones Personalizadas',
      title: 'Mentoría & Asesoría',
      highlight: 'Estratégica',
      intro:
        'Acompañamiento estratégico para empresas que buscan un desarrollo profundo, con monitoreo continuo y ajustes basados en criterios técnicos.',
      cards: [
        {
          icon: 'brain',
          title: 'Desarrollo Conductual',
          description:
            'Ejercicios neurocognitivos avanzados para reorganizar patrones mentales y conductuales.',
        },
        {
          icon: 'trending-up',
          title: 'Economía Conductual',
          description:
            'Análisis de sesgos y patrones decisorios que influyen en decisiones personales y organizacionales.',
        },
        {
          icon: 'bar-chart',
          title: 'Métricas de Desempeño',
          description:
            'Evaluación objetiva de progreso y soporte a la toma de decisiones basada en datos.',
        },
        {
          icon: 'building',
          title: 'Estructuración Organizacional',
          description:
            'Organización estratégica de procesos enfocada en eficiencia y crecimiento sostenible.',
        },
        {
          icon: 'heart-handshake',
          title: 'Gestión Emocional y Resiliencia',
          description:
            'Desarrollo de estabilidad emocional para la toma de decisiones bajo presión.',
        },
        {
          icon: 'compass',
          title: 'Inteligencia Estratégica',
          description:
            'Integración de análisis y visión sistémica para optimizar decisiones y resultados.',
        },
      ],
      cta: 'Potencia la Mente y la Decisión – Saber Más',
    },
    business: {
      eyebrow: 'Producto Empresarial',
      title: 'Transforma Intuición en',
      highlight: 'Precisión',
      description:
        'El Sistema Neuroanalítico convierte percepciones subjetivas en métricas objetivas. En hasta 3 semanas, entregamos un diagnóstico técnico que orienta decisiones estratégicas.',
      stats: [
        { value: '+90%', label: 'Precisión en las Métricas' },
        { value: '100%', label: 'Toma de Decisiones Segura' },
      ],
      benefits: [
        'Sistema Neuroanalítico Empresarial',
        'Modelado Matemático Aplicado',
        'Claridad de Procesos y Desempeño',
        'Decisiones Basadas en Evidencia',
      ],
      cta: 'Quiero el Diagnóstico Completo',
      imageAlt: 'Gráficos de datos complejos',
    },
    workshops: {
      eyebrow: 'Charlas y Workshops',
      title: 'Transforma tu empresa invirtiendo en el potencial de las personas',
      intro:
        'Llevar conocimiento científico actualizado a la gestión de personas fortalece la estructura organizacional y cualifica la toma de decisiones.',
      cards: [
        {
          title: 'Rapport y Neurolingüística Aplicada',
          description:
            'Técnicas avanzadas de neurolingüística para construir rapport y negociar eficazmente.',
        },
        {
          title: 'Neurociencia del Pensamiento Positivo',
          description:
            'Fundamentos neuronales de los patrones mentales adaptativos y la regulación emocional.',
        },
        {
          title: 'Salud Mental en el Entorno Corporativo',
          description: 'Contenido estructurado sobre salud mental organizacional.',
        },
        {
          title: 'Depresión, Ansiedad y Burnout',
          description: 'Identificación de señales conductuales para un reconocimiento temprano.',
        },
      ],
      cta: 'Solicitar Propuesta para tu Empresa',
    },
    digitalProducts: {
      title: 'Potencia tu Conocimiento',
      highlight: 'con Nuestros Productos Digitales',
      badge: 'Serie Masterclass',
      cardTitle: 'Cerebro, Dinero y Riqueza',
      cardDescription:
        'Programas estructurados en módulos que integran neurociencia, economía conductual y psicología financiera.',
      cta: 'Acceder a las Masterclasses',
      imageAlt: 'Productos Digitales',
    },
    immersionTeaser: {
      eyebrow: 'Vivencia Presencial',
      title: 'Inmersión Despertar de la Consciencia',
      paragraphs: [
        'Una experiencia presencial de un día que integra neurociencia, espiritualidad y autoconciencia.',
        'El evento es interreligioso, abierto a todas las creencias, en un ambiente respetuoso y seguro.',
      ],
      cta: 'Conocer la Inmersión',
      imageAlt: 'Inmersión Despertar de la Consciencia',
    },
  },
}
