import type { Locale } from 'next-intl'
import type { RedesignAtendimentoContent } from './types'

/** Real content from the live site (/pt/atendimento). en/es are draft translations. */
export const redesignAtendimentoContent: Record<Locale, RedesignAtendimentoContent> = {
  pt: {
    hero: {
      title: 'Reorganize Mente, Emoções e Decisões',
      subtitle:
        'Atendimento neurocognitivo científico e estratégico para clareza mental, redução de tensões e avanço real na vida.',
      cta: 'Agendar Avaliação Inicial',
      imageAlt: 'Atendimento neurocognitivo individual no Instituto EZ',
    },
    assessment: {
      eyebrow: 'O Primeiro Passo Essencial',
      title: 'Avaliação Inicial',
      paragraphs: [
        'O processo começa com uma avaliação estruturada de até duas horas, realizada presencialmente ou online, com valor fixo e agendamento prévio.',
        'Esse encontro é dedicado a compreender com profundidade o momento atual da pessoa, os desafios emocionais ou cognitivos presentes, o impacto da rotina e responsabilidades, os padrões que mantêm a mente sobrecarregada, e os objetivos que precisam ganhar clareza e direção.',
        'A avaliação funciona como um mapeamento neurocomportamental, identificando tanto o que precisa ser estabilizado quanto o que pode ser expandido. Se houver sinais de que a situação exige suporte complementar, isso será orientado de forma responsável e transparente.',
        'Ao final da avaliação, você recebe clareza sobre o seu estado atual e sobre o caminho mais adequado para seguir, com ou sem os atendimentos.',
      ],
    },
    sessions: {
      eyebrow: 'Sessões do Método',
      title: 'Exercícios neurocognitivos aplicados estrategicamente',
      cards: [
        {
          title: 'Redução de Tensões Emocionais',
          description:
            'Exercícios neurocognitivos para aliviar ansiedade, estresse e sobrecarga mental intensa.',
        },
        {
          title: 'Reorganização de Pensamentos',
          description:
            'Técnicas para restabelecer o foco, clareza mental e organização de ideias dispersas.',
        },
        {
          title: 'Clareza em Decisões',
          description:
            'Processos para fortalecer a tomada de decisão em momentos de alta pressão ou transição.',
        },
        {
          title: 'Desbloqueio e Expansão',
          description:
            'Métodos para desbloquear ideias, fortalecer autorregulação e ampliar consciência pessoal.',
        },
      ],
      paragraphs: [
        'Após a avaliação, inicia-se o atendimento pelo método Instituto EZ. Cada sessão utiliza exercícios neurocognitivos específicos, aplicados de forma estratégica para reorganizar mente, emoções e decisões.',
        'Os exercícios são selecionados e adaptados em tempo real, sempre levando em conta o estado emocional, as necessidades cognitivas e os objetivos da pessoa naquele momento. Uma única sessão já pode gerar alívio e clareza imediata.',
      ],
      cta: 'Quero iniciar o processo',
      imageAlt: 'Sessão de atendimento neurocognitivo personalizado',
    },
    forWhom: {
      title: 'Para Quem é Indicado',
      paragraphs: [
        'O método é indicado para quem está passando por crises emocionais, ansiedade intensa, burnout ou sobrecarga mental, vivendo situações de alta pressão que exigem clareza imediata, ou sobrecarregado por demandas pessoais ou profissionais.',
        'Também é adequado para quem está em transição de vida e precisa reorganizar pensamentos, prioridades e direção, ou em um bom momento, mas deseja expandir foco, fortalecer a mente e evoluir com mais consciência.',
        'Uma abordagem para emergências emocionais e processos de crescimento pessoal.',
      ],
      cta: 'Quero reorganizar minha mente',
    },
    benefits: {
      title: 'Benefícios do Método',
      intro: 'Logo nas primeiras sessões, você pode sentir:',
      items: [
        'Redução significativa da carga emocional',
        'Clareza mental para decisões urgentes',
        'Reorganização de pensamentos dispersos',
        'Alívio de tensões internas e sobrecarga',
        'Desbloqueio de ideias e novas possibilidades',
        'Retomada da direção e do equilíbrio',
      ],
    },
    closing: {
      title: 'Clareza, Leveza e Consciência',
      body: 'O Método Instituto EZ foi desenvolvido para gerar resultados reais: mais leveza, mais consciência e mais capacidade de agir com precisão. Reorganize sua mente. Retome sua direção. Avance com clareza.',
      cta: 'Agendar Avaliação Inicial',
    },
  },
  en: {
    hero: {
      title: 'Reorganize Mind, Emotions, and Decisions',
      subtitle:
        'Scientific, strategic neurocognitive care for mental clarity, reduced tension, and real progress in life.',
      cta: 'Schedule Initial Assessment',
      imageAlt: 'Individual neurocognitive care at Instituto EZ',
    },
    assessment: {
      eyebrow: 'The Essential First Step',
      title: 'Initial Assessment',
      paragraphs: [
        'The process begins with a structured assessment of up to two hours, in-person or online, fixed price, scheduled in advance.',
        'This session is dedicated to deeply understanding the person’s current moment, emotional or cognitive challenges, and the goals that need clarity and direction.',
        'The assessment works as a neurobehavioral mapping, identifying both what needs to be stabilized and what can be expanded.',
        'At the end, you receive clarity about your current state and the most suitable path forward.',
      ],
    },
    sessions: {
      eyebrow: 'Method Sessions',
      title: 'Strategically applied neurocognitive exercises',
      cards: [
        {
          title: 'Reducing Emotional Tension',
          description:
            'Neurocognitive exercises to relieve anxiety, stress, and intense mental overload.',
        },
        {
          title: 'Reorganizing Thoughts',
          description: 'Techniques to restore focus, mental clarity, and organize scattered ideas.',
        },
        {
          title: 'Clarity in Decisions',
          description: 'Processes to strengthen decision-making under high pressure or transition.',
        },
        {
          title: 'Unblocking and Expansion',
          description:
            'Methods to unblock ideas, strengthen self-regulation, and expand personal awareness.',
        },
      ],
      paragraphs: [
        'After the assessment, sessions begin using the Instituto EZ method — specific neurocognitive exercises applied strategically to reorganize mind, emotions, and decisions.',
        'Exercises are selected and adapted in real time. A single session can already bring relief and immediate clarity.',
      ],
      cta: 'I want to start the process',
      imageAlt: 'Personalized neurocognitive care session',
    },
    forWhom: {
      title: 'Who It’s For',
      paragraphs: [
        'The method is suited for those going through emotional crises, intense anxiety, burnout, or mental overload.',
        'It’s also suited for those in a life transition needing to reorganize thoughts and priorities, or those in a good place who want to expand focus and evolve with more awareness.',
        'An approach for emotional emergencies and personal growth processes.',
      ],
      cta: 'I want to reorganize my mind',
    },
    benefits: {
      title: 'Method Benefits',
      intro: 'Already in the first sessions, you may feel:',
      items: [
        'Significant reduction in emotional load',
        'Mental clarity for urgent decisions',
        'Reorganization of scattered thoughts',
        'Relief from internal tension and overload',
        'Unblocked ideas and new possibilities',
        'Regained direction and balance',
      ],
    },
    closing: {
      title: 'Clarity, Lightness, and Awareness',
      body: 'The Instituto EZ Method was developed to generate real results: more lightness, more awareness, more precision in action.',
      cta: 'Schedule Initial Assessment',
    },
  },
  es: {
    hero: {
      title: 'Reorganiza Mente, Emociones y Decisiones',
      subtitle:
        'Atención neurocognitiva científica y estratégica para claridad mental, reducción de tensiones y avance real en la vida.',
      cta: 'Agendar Evaluación Inicial',
      imageAlt: 'Atención neurocognitiva individual en el Instituto EZ',
    },
    assessment: {
      eyebrow: 'El Primer Paso Esencial',
      title: 'Evaluación Inicial',
      paragraphs: [
        'El proceso comienza con una evaluación estructurada de hasta dos horas, presencial u online, con valor fijo y cita previa.',
        'Este encuentro está dedicado a comprender en profundidad el momento actual de la persona y los objetivos que necesitan claridad y dirección.',
        'La evaluación funciona como un mapeo neuroconductual, identificando qué necesita estabilizarse y qué puede expandirse.',
        'Al final, recibes claridad sobre tu estado actual y el camino más adecuado a seguir.',
      ],
    },
    sessions: {
      eyebrow: 'Sesiones del Método',
      title: 'Ejercicios neurocognitivos aplicados estratégicamente',
      cards: [
        {
          title: 'Reducción de Tensiones Emocionales',
          description:
            'Ejercicios neurocognitivos para aliviar ansiedad, estrés y sobrecarga mental intensa.',
        },
        {
          title: 'Reorganización de Pensamientos',
          description: 'Técnicas para restablecer el enfoque y la claridad mental.',
        },
        {
          title: 'Claridad en las Decisiones',
          description: 'Procesos para fortalecer la toma de decisiones bajo alta presión.',
        },
        {
          title: 'Desbloqueo y Expansión',
          description: 'Métodos para desbloquear ideas y ampliar la consciencia personal.',
        },
      ],
      paragraphs: [
        'Después de la evaluación, comienza la atención mediante el método Instituto EZ, con ejercicios neurocognitivos específicos aplicados estratégicamente.',
        'Una sola sesión ya puede generar alivio y claridad inmediata.',
      ],
      cta: 'Quiero iniciar el proceso',
      imageAlt: 'Sesión de atención neurocognitiva personalizada',
    },
    forWhom: {
      title: 'Para Quién Está Indicado',
      paragraphs: [
        'El método está indicado para quienes atraviesan crisis emocionales, ansiedad intensa, burnout o sobrecarga mental.',
        'También es adecuado para quienes están en transición de vida o desean expandir el enfoque y evolucionar con más consciencia.',
        'Un enfoque para emergencias emocionales y procesos de crecimiento personal.',
      ],
      cta: 'Quiero reorganizar mi mente',
    },
    benefits: {
      title: 'Beneficios del Método',
      intro: 'Ya en las primeras sesiones, puedes sentir:',
      items: [
        'Reducción significativa de la carga emocional',
        'Claridad mental para decisiones urgentes',
        'Reorganización de pensamientos dispersos',
        'Alivio de tensiones internas y sobrecarga',
        'Desbloqueo de ideas y nuevas posibilidades',
        'Recuperación de la dirección y el equilibrio',
      ],
    },
    closing: {
      title: 'Claridad, Ligereza y Consciencia',
      body: 'El Método Instituto EZ fue desarrollado para generar resultados reales: más ligereza, más consciencia y más precisión al actuar.',
      cta: 'Agendar Evaluación Inicial',
    },
  },
}
