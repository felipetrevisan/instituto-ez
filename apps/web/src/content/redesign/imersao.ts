import type { Locale } from 'next-intl'
import type { RedesignImersaoContent } from './types'

/**
 * Real content from the live site (/pt/imersao). FAQ answers were behind an
 * accordion the extraction couldn't expand, so they're short and grounded in
 * the rest of the page copy — flag for review against the real answers.
 * en/es are draft translations.
 */
export const redesignImersaoContent: Record<Locale, RedesignImersaoContent> = {
  pt: {
    hero: {
      title: 'Despertar da Consciência',
      tags: ['Neurociência', 'Espiritualidade', 'Consciência', 'Fé'],
      cta: 'Quero Participar da Imersão',
      imageAlt: 'Imersão Despertar da Consciência',
    },
    intro: {
      title: 'Uma jornada onde mente e espírito se conectam',
      paragraphs: [
        'A Imersão Despertar da Consciência é uma jornada única, onde mente e espírito se conectam em uma experiência profunda, capaz de provocar uma mudança concreta no seu modo de viver e sentir.',
        'Mais do que um evento, é um chamado para quem deseja encontrar sentido verdadeiro na jornada da vida, curar feridas e libertar-se de amarras que impedem sua expansão.',
        'Essa vivência transcende as barreiras religiosas, acolhendo com respeito todas as crenças em um espaço inter-religioso, seguro e integrador. Baseada na neurociência e sustentada por práticas espirituais milenares, ela convida você a fortalecer sua fé, desbloquear sua mente e expandir sua consciência.',
      ],
    },
    guides: {
      eyebrow: 'Seus Guias',
      title: 'Ciência e Espiritualidade em um só propósito',
      subtitle:
        'Essa jornada será conduzida por dois professores que unem ciência e espiritualidade para expandir sua consciência de forma profunda e real.',
      people: [
        {
          name: 'Enzo Pasqualetti',
          role: 'Mestre em Neurociência e Cognição',
          bio: 'Com mais de 15 anos de experiência clínica na área da saúde mental, é especialista na aplicação de exercícios neurocognitivos, com foco em reorganização emocional, clareza mental e tomada de decisões mais conscientes.',
        },
        {
          name: 'Felipe Brito D’Agelo (Giriraj)',
          role: 'Professor de Yoga há 18 anos',
          bio: 'Nome recebido de sua mestra na Índia. Faz parte de tradições de Yoga, Vedanta, Meditação e Tantra não dual. É especialista em filosofia hindu e alfabetização em sânscrito.',
        },
      ],
      imageAlt: 'Neurociência e espiritualidade',
    },
    elements: {
      eyebrow: 'O Que Você Vai Vivenciar',
      title: 'Os 7 Elementos para a Fé',
      intro:
        'Em um mundo que nos distrai, enfraquece e desconecta, reconectar-se com Deus se tornou um ato de coragem. Nesta imersão, você será conduzido por uma vivência prática, emocional e espiritual que passa por sete fundamentos essenciais.',
      items: [
        {
          title: 'Responsabilidade e Respeito',
          description:
            'Você só transforma aquilo que assume. E só cresce ao respeitar a si mesmo, os outros e o sagrado.',
        },
        {
          title: 'Neurociência e Consciência',
          description:
            'Entenda, com base científica, como sua mente constrói a realidade, e como expandi-la de forma clara e emocionalmente saudável.',
        },
        {
          title: 'Deus (Luz Universal)',
          description: 'Retire os véus da religião e encontre Deus na essência, dentro de você.',
        },
        {
          title: 'Comunicação com o Divino',
          description:
            'Aprenda a orar com verdade, a escutar com silêncio, a receber mensagens da sua alma.',
        },
        {
          title: 'Perdoar e Pedir Perdão',
          description:
            'Libere-se, com profundidade e coragem, dos laços invisíveis que ainda te aprisionam.',
        },
        {
          title: 'Gratidão como Estado de Consciência',
          description:
            'Mais do que agradecer: é sentir. A gratidão reorganiza o seu sistema inteiro.',
        },
        {
          title: 'Presente de Deus',
          description: 'A vivência final: consciência espiritual.',
        },
      ],
      closing:
        'Cada um desses elementos será vivido com profundidade, respeito e verdade. Ao final da imersão, não será apenas sua fé que estará mais forte — será você por inteiro!',
      cta: 'Quero Participar da Imersão',
      imageAlt: 'Os 7 elementos para a fé',
    },
    forWhom: {
      eyebrow: 'Para Quem É Esta Imersão',
      title: 'Essa imersão é para você?',
      items: [
        'Para quem deseja fortalecer sua fé com mais consciência, sem perder sua essência.',
        'Para quem sente que está tudo bem, mas quer algo a mais, com conexão, clareza e verdade.',
        'Para quem busca um momento para si, longe do barulho, para reorganizar o que sente e o que acredita.',
        'Para quem valoriza espiritualidade, mas também quer entender como a mente funciona.',
        'Para quem tem fé, mas quer vivê-la com mais presença, mais propósito e mais profundidade.',
        'Para quem não quer respostas prontas, mas quer descobrir por si mesmo o que faz sentido.',
        'Para quem quer silenciar, perdoar, agradecer, e sentir Deus de verdade, sem intermediários.',
      ],
      footer:
        'Todas as crenças são bem-vindas. Aqui, o que importa é a sua vontade de viver sua espiritualidade de forma livre, com espaço para sentir, pensar e crer com autenticidade.',
      cta: 'Quero Fazer Parte da Próxima Turma',
    },
    faq: {
      eyebrow: 'Dúvidas Frequentes',
      title: 'Perguntas comuns',
      items: [
        {
          question: 'Preciso seguir uma religião?',
          answer:
            'Não. A imersão é inter-religiosa e aberta a todas as crenças, com um espaço seguro e respeitoso para cada participante.',
        },
        {
          question: 'É teórica ou vivencial?',
          answer:
            'É essencialmente vivencial, com práticas guiadas que integram neurociência e espiritualidade ao longo dos 7 elementos da jornada.',
        },
        {
          question: 'Preciso ter experiência com espiritualidade ou meditação?',
          answer:
            'Não é necessário. A imersão foi construída para acolher desde iniciantes até praticantes experientes.',
        },
        {
          question: 'Sou cético com espiritualidade. Ainda assim faz sentido eu participar?',
          answer:
            'Sim. A base científica da neurociência caminha lado a lado com as práticas espirituais, oferecendo um ponto de entrada racional para quem tem dúvidas.',
        },
        {
          question: 'Vou precisar expor algo da minha vida pessoal?',
          answer:
            'Não há exposição obrigatória. Cada participante vive o processo em seu próprio ritmo e nível de abertura.',
        },
        {
          question: 'Moro fora do Brasil. Posso participar da imersão?',
          answer:
            'A imersão é presencial, em São Paulo. Entre em contato para avaliarmos a melhor forma de você participar da próxima turma.',
        },
      ],
    },
    nextClass: {
      eyebrow: 'Próxima Turma',
      title: 'Um grupo íntimo. Um espaço seguro.',
      details: [
        'Turma com no máximo 16 participantes',
        'Rua Joaquim de Almeida, 371 - Mirandópolis, São Paulo - SP',
        'Data: a definir',
        'Duração: 8 horas com Certificação',
        'Com apostila inclusa',
        'Refeição (almoço) + Coffee Break',
      ],
      cta: 'Reservar Minha Vaga',
      footnote: 'Vagas limitadas • Certificação inclusa',
    },
    gallery: {
      title: 'Registros de imersões anteriores',
      imageAlt: 'Momento da Imersão Despertar da Consciência',
    },
  },
  en: {
    hero: {
      title: 'Awakening Consciousness',
      tags: ['Neuroscience', 'Spirituality', 'Consciousness', 'Faith'],
      cta: 'I Want to Join the Immersion',
      imageAlt: 'Awakening Consciousness Immersion',
    },
    intro: {
      title: 'A journey where mind and spirit connect',
      paragraphs: [
        'The Awakening Consciousness Immersion is a unique journey where mind and spirit connect in a deep experience capable of provoking real change.',
        'It transcends religious barriers, welcoming all beliefs in an interfaith, safe, and integrative space.',
      ],
    },
    guides: {
      eyebrow: 'Your Guides',
      title: 'Science and Spirituality in one purpose',
      subtitle: 'This journey is led by two teachers who unite science and spirituality.',
      people: [
        {
          name: 'Enzo Pasqualetti',
          role: 'Master in Neuroscience and Cognition',
          bio: 'With over 15 years of clinical experience in mental health, specializing in neurocognitive exercises for emotional reorganization and mental clarity.',
        },
        {
          name: 'Felipe Brito D’Agelo (Giriraj)',
          role: 'Yoga Teacher for 18 years',
          bio: 'Part of Yoga, Vedanta, Meditation, and non-dual Tantra traditions, specializing in Hindu philosophy and Sanskrit.',
        },
      ],
      imageAlt: 'Neuroscience and spirituality',
    },
    elements: {
      eyebrow: 'What You’ll Experience',
      title: 'The 7 Elements of Faith',
      intro:
        'In a world that distracts and disconnects us, reconnecting with God has become an act of courage.',
      items: [
        {
          title: 'Responsibility and Respect',
          description: 'You only transform what you take ownership of.',
        },
        {
          title: 'Neuroscience and Consciousness',
          description: 'Understand, scientifically, how your mind builds reality.',
        },
        {
          title: 'God (Universal Light)',
          description: 'Remove the veils of religion and find God in essence.',
        },
        {
          title: 'Communication with the Divine',
          description: 'Learn to pray with truth and listen in silence.',
        },
        {
          title: 'Forgiving and Asking Forgiveness',
          description: 'Free yourself from invisible bonds.',
        },
        {
          title: 'Gratitude as a State of Consciousness',
          description: 'More than thanking — feeling.',
        },
        { title: 'Gift of God', description: 'The final experience: spiritual consciousness.' },
      ],
      closing:
        'By the end of the immersion, it won’t just be your faith that’s stronger — it’ll be all of you.',
      cta: 'I Want to Join the Immersion',
      imageAlt: 'The 7 elements of faith',
    },
    forWhom: {
      eyebrow: 'Who This Immersion Is For',
      title: 'Is this immersion for you?',
      items: [
        'For those who want to strengthen their faith with more consciousness.',
        'For those who feel things are fine but want more connection and clarity.',
        'For those seeking a moment for themselves, away from the noise.',
        'For those who value spirituality but also want to understand the mind.',
      ],
      footer: 'All beliefs are welcome here.',
      cta: 'I Want to Join the Next Class',
    },
    faq: {
      eyebrow: 'Frequently Asked Questions',
      title: 'Common questions',
      items: [
        {
          question: 'Do I need to follow a religion?',
          answer:
            'No. The immersion is interfaith and open to all beliefs, in a safe and respectful space.',
        },
        {
          question: 'Is it theoretical or experiential?',
          answer:
            'It’s primarily experiential, with guided practices across the 7 elements of the journey.',
        },
        {
          question: 'Do I need experience with spirituality or meditation?',
          answer:
            'Not necessary — the immersion welcomes beginners and experienced practitioners alike.',
        },
        {
          question: 'I’m skeptical about spirituality. Does it still make sense for me to join?',
          answer: 'Yes — the scientific grounding in neuroscience offers a rational entry point.',
        },
        {
          question: 'Will I need to share personal details?',
          answer: 'There’s no mandatory sharing. Each participant goes at their own pace.',
        },
        {
          question: 'I live outside Brazil. Can I join?',
          answer:
            'The immersion is in-person in São Paulo. Reach out so we can find the best way for you to join.',
        },
      ],
    },
    nextClass: {
      eyebrow: 'Next Class',
      title: 'An intimate group. A safe space.',
      details: [
        'Groups of up to 16 participants',
        'Rua Joaquim de Almeida, 371 - Mirandópolis, São Paulo - SP',
        'Date: to be defined',
        'Duration: 8 hours with certification',
        'Workbook included',
        'Lunch + coffee break included',
      ],
      cta: 'Reserve My Spot',
      footnote: 'Limited spots • Certification included',
    },
    gallery: {
      title: 'Moments from past immersions',
      imageAlt: 'Moment from the Awakening Consciousness Immersion',
    },
  },
  es: {
    hero: {
      title: 'Despertar de la Consciencia',
      tags: ['Neurociencia', 'Espiritualidad', 'Consciencia', 'Fe'],
      cta: 'Quiero Participar en la Inmersión',
      imageAlt: 'Inmersión Despertar de la Consciencia',
    },
    intro: {
      title: 'Un viaje donde mente y espíritu se conectan',
      paragraphs: [
        'La Inmersión Despertar de la Consciencia es un viaje único donde mente y espíritu se conectan en una experiencia profunda.',
        'Trasciende las barreras religiosas, acogiendo con respeto todas las creencias en un espacio interreligioso y seguro.',
      ],
    },
    guides: {
      eyebrow: 'Tus Guías',
      title: 'Ciencia y Espiritualidad en un solo propósito',
      subtitle: 'Este viaje será conducido por dos maestros que unen ciencia y espiritualidad.',
      people: [
        {
          name: 'Enzo Pasqualetti',
          role: 'Máster en Neurociencia y Cognición',
          bio: 'Con más de 15 años de experiencia clínica en salud mental, especialista en ejercicios neurocognitivos.',
        },
        {
          name: 'Felipe Brito D’Agelo (Giriraj)',
          role: 'Profesor de Yoga hace 18 años',
          bio: 'Parte de las tradiciones de Yoga, Vedanta, Meditación y Tantra no dual.',
        },
      ],
      imageAlt: 'Neurociencia y espiritualidad',
    },
    elements: {
      eyebrow: 'Lo Que Vivirás',
      title: 'Los 7 Elementos para la Fe',
      intro:
        'En un mundo que nos distrae y desconecta, reconectar con Dios se ha vuelto un acto de valentía.',
      items: [
        { title: 'Responsabilidad y Respeto', description: 'Solo transformas aquello que asumes.' },
        {
          title: 'Neurociencia y Consciencia',
          description: 'Entiende, con base científica, cómo tu mente construye la realidad.',
        },
        {
          title: 'Dios (Luz Universal)',
          description: 'Retira los velos de la religión y encuentra a Dios en la esencia.',
        },
        {
          title: 'Comunicación con lo Divino',
          description: 'Aprende a orar con verdad y a escuchar en silencio.',
        },
        { title: 'Perdonar y Pedir Perdón', description: 'Libérate, con profundidad y valentía.' },
        {
          title: 'Gratitud como Estado de Consciencia',
          description: 'Más que agradecer: es sentir.',
        },
        { title: 'Regalo de Dios', description: 'La vivencia final: consciencia espiritual.' },
      ],
      closing: 'Al final de la inmersión, no solo tu fe será más fuerte — serás tú por completo.',
      cta: 'Quiero Participar en la Inmersión',
      imageAlt: 'Los 7 elementos para la fe',
    },
    forWhom: {
      eyebrow: 'Para Quién Es Esta Inmersión',
      title: '¿Esta inmersión es para ti?',
      items: [
        'Para quien desea fortalecer su fe con más consciencia.',
        'Para quien siente que todo está bien, pero quiere algo más.',
        'Para quien busca un momento para sí, lejos del ruido.',
        'Para quien valora la espiritualidad, pero también quiere entender la mente.',
      ],
      footer: 'Todas las creencias son bienvenidas.',
      cta: 'Quiero Ser Parte de la Próxima Clase',
    },
    faq: {
      eyebrow: 'Preguntas Frecuentes',
      title: 'Preguntas comunes',
      items: [
        {
          question: '¿Necesito seguir una religión?',
          answer: 'No. La inmersión es interreligiosa y abierta a todas las creencias.',
        },
        {
          question: '¿Es teórica o vivencial?',
          answer:
            'Es principalmente vivencial, con prácticas guiadas a lo largo de los 7 elementos.',
        },
        {
          question: '¿Necesito experiencia con espiritualidad o meditación?',
          answer:
            'No es necesario. La inmersión acoge tanto a principiantes como a practicantes experimentados.',
        },
        {
          question: 'Soy escéptico con la espiritualidad. ¿Aun así tiene sentido participar?',
          answer: 'Sí. La base científica de la neurociencia ofrece un punto de entrada racional.',
        },
        {
          question: '¿Tendré que exponer algo de mi vida personal?',
          answer: 'No hay exposición obligatoria. Cada participante avanza a su propio ritmo.',
        },
        {
          question: 'Vivo fuera de Brasil. ¿Puedo participar?',
          answer:
            'La inmersión es presencial en São Paulo. Contáctanos para evaluar la mejor forma de participar.',
        },
      ],
    },
    nextClass: {
      eyebrow: 'Próxima Clase',
      title: 'Un grupo íntimo. Un espacio seguro.',
      details: [
        'Grupo de hasta 16 participantes',
        'Rua Joaquim de Almeida, 371 - Mirandópolis, São Paulo - SP',
        'Fecha: por definir',
        'Duración: 8 horas con certificación',
        'Incluye material de apoyo',
        'Almuerzo + coffee break incluidos',
      ],
      cta: 'Reservar Mi Lugar',
      footnote: 'Cupos limitados • Certificación incluida',
    },
    gallery: {
      title: 'Momentos de inmersiones anteriores',
      imageAlt: 'Momento de la Inmersión Despertar de la Consciencia',
    },
  },
}
