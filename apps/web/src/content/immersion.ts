export const immersion = {
  hero: {
    title: 'Despertar da',
    titleAccent: 'Consciência',
    pillars: ['Neurociência', 'Espiritualidade', 'Consciência', 'Fé'],
    cta: 'Quero Participar da Imersão',
    image: '/assets/images/immersion/hero.webp',
  },
  intro: {
    title: 'Uma jornada onde mente e espírito se conectam',
    paragraphs: [
      'A **Imersão Despertar da Consciência** é uma jornada única, onde mente e espírito se conectam em uma experiência profunda, capaz de provocar uma **mudança concreta** no seu modo de viver e sentir.',
      'Mais do que um evento, é um **chamado** para quem deseja encontrar sentido verdadeiro na jornada da vida, curar feridas e libertar-se de amarras que impedem sua expansão.',
    ],
    highlight:
      'Essa vivência transcende as barreiras religiosas, acolhendo com respeito **todas as crenças** em um espaço inter-religioso, seguro e integrador.',
    closing:
      'Baseada na **neurociência** e sustentada por práticas espirituais milenares, ela convida você a fortalecer sua fé, desbloquear sua mente, expandir sua consciência e mergulhar em um processo individual e profundo para dentro de si.',
  },
  instructors: {
    eyebrow: 'Seus Guias',
    title: 'Ciência e Espiritualidade em um só propósito',
    text: 'Essa jornada será conduzida por dois professores que unem ciência e espiritualidade para expandir sua consciência de forma profunda e real.',
    items: [
      {
        name: 'Enzo Pasqualetti',
        role: 'Mestre em Neurociência e Cognição',
        text: 'Com mais de 15 anos de experiência clínica na área da saúde mental, é especialista na aplicação de exercícios neurocognitivos, com foco em reorganização emocional, clareza mental e tomada de decisões mais conscientes.',
        image: '/assets/images/immersion/enzo.webp',
      },
      {
        name: "Felipe Brito D'Agelo (Giriraj)",
        role: 'Professor de Yoga há 18 anos',
        text: 'Nome recebido de sua mestra na Índia. Faz parte de tradições de Yoga, Vedanta, Meditação e Tantra não dual. É especialista em filosofia hindu e alfabetização em sânscrito, com profunda vivência nas tradições espirituais orientais.',
        image: '/assets/images/immersion/giriraj.webp',
      },
    ],
    footer:
      'Juntos, eles conduzirão você por uma jornada profunda de **autoconhecimento** e **fé**.',
  },
  experience: {
    eyebrow: 'O Que Você Vai Vivenciar',
    title: 'Os 7 Elementos para a Fé',
    text: 'Em um mundo que nos distrai, enfraquece e desconecta, reconectar-se com Deus se tornou um **ato de coragem**. Nesta imersão, você será conduzido por uma vivência prática, emocional e espiritual que passa por sete fundamentos essenciais.',
    items: [
      {
        icon: 'shield',
        title: 'Responsabilidade e Respeito',
        text: 'Você só transforma aquilo que assume. E só cresce ao respeitar a si mesmo, os outros e o sagrado. Aqui começa a base ética da sua nova caminhada.',
      },
      {
        icon: 'brain',
        title: 'Neurociência e Consciência',
        text: 'Entenda, com base científica, como sua mente constrói a realidade, e como expandi-la de forma clara, lúcida e emocionalmente saudável.',
      },
      {
        icon: 'sun',
        title: 'Deus (Luz Universal)',
        text: 'Retire os véus da religião e encontre Deus na essência. Uma força viva, direta, presente, dentro de você.',
      },
      {
        icon: 'message',
        title: 'Comunicação com o Divino',
        text: 'Aprenda a orar com verdade. A escutar com silêncio. A receber e enviar mensagens reais da sua alma para o universo espiritual.',
      },
      {
        icon: 'heart',
        title: 'Perdoar e Pedir Perdão',
        text: 'Libere-se. Com profundidade. Com coragem. Aqui você será guiado a romper os laços invisíveis que ainda te aprisionam.',
      },
      {
        icon: 'sparkles',
        title: 'Gratidão como Estado de Consciência',
        text: 'Mais do que agradecer: é sentir. Viver com a presença do que é bom, mesmo nos dias escuros. A gratidão reorganiza o seu sistema inteiro.',
      },
      {
        icon: 'gift',
        title: 'Presente de Deus',
        text: 'A vivência final. Consciência espiritual.',
      },
    ],
    footer: [
      'Cada um desses elementos será vivido com **profundidade**, **respeito** e **verdade**.',
      'Ao final da imersão, não será apenas sua fé que estará mais forte — **será você por inteiro!**',
    ],
    cta: 'Quero Participar da Imersão',
  },
  target: {
    eyebrow: 'Para Quem é Esta Imersão',
    title: 'Essa imersão é para você?',
    items: [
      'Para quem deseja fortalecer sua fé com mais consciência, sem perder sua essência.',
      'Para quem sente que está tudo bem, mas quer algo a mais, com conexão, clareza e verdade.',
      'Para quem busca um momento para si, longe do barulho, para reorganizar o que sente e o que acredita.',
      'Para quem valoriza espiritualidade, mas também quer entender como a mente funciona e como isso impacta sua vida.',
      'Para quem tem fé, mas quer vivê-la com mais presença, mais propósito e mais profundidade.',
      'Para quem não quer respostas prontas, mas quer descobrir por si mesmo o que realmente faz sentido.',
      'Para quem sente que a fé ainda pulsa, mas está abafada pelas dores, pelas distrações e pelos ruídos do mundo.',
      'Para quem quer silenciar, perdoar, agradecer, e sentir Deus de verdade, sem intermediários.',
    ],
    footer: [
      'Se você busca uma **espiritualidade com consciência**, e uma **consciência com fé**, esta imersão é para você.',
      'Todas as crenças são bem-vindas. Aqui, o que importa é a sua vontade de viver sua espiritualidade de forma **livre**, sem amarras, com espaço para sentir, pensar e crer com autenticidade.',
    ],
  },
  gallery: {
    title: 'Quem já viveu, nunca mais esquece',
    subtitle: 'Uma experiência que conecta você consigo mesmo e com o sagrado',
    cta: 'Quero Fazer Parte da Próxima Turma',
    images: Array.from(
      { length: 10 },
      (_, i) => `/assets/images/immersion/gallery/${String(i + 1).padStart(2, '0')}.webp`,
    ),
  },
  faq: {
    eyebrow: 'Dúvidas Frequentes',
    title: 'Perguntas comuns',
    items: [
      {
        question: 'Preciso seguir uma religião?',
        answer:
          'Não. A imersão é inter-religiosa, o que significa que todas as religiões e crenças espirituais são bem-vindas. O foco é a consciência e a vivência espiritual autêntica. Cada participante mergulha para dentro de si e da forma como se relaciona com Deus.',
      },
      {
        question: 'É teórica ou vivencial?',
        answer:
          'É uma combinação das duas abordagens: teórica e vivencial. Na imersão, antes de cada vivência, você terá o entendimento neurocientífico sobre os tópicos abordados, para que tudo fique claro e os conceitos estejam alinhados com os exercícios neurocognitivos. Isso permite que você não apenas participe, mas compreenda profundamente o que está vivendo, integrando ciência e fé em cada etapa.',
      },
      {
        question: 'Preciso ter experiência com espiritualidade ou meditação?',
        answer:
          'Não. A imersão é aberta a todos, independentemente de práticas anteriores. Você não precisa ter experiência com espiritualidade, meditação ou qualquer linha específica. O essencial é a sua disposição para mergulhar na vivência, sentir com verdade e permitir-se uma conexão mais profunda consigo mesmo e com o divino.',
      },
      {
        question: 'Sou cético com espiritualidade. Ainda assim faz sentido eu participar?',
        answer:
          'Sim. A imersão é baseada em neurociência, consciência e experiência direta. Ela não exige crenças específicas. Apenas a sua vontade de explorar, com liberdade, um novo universo de entendimento sobre mente, espiritualidade e fé.',
      },
      {
        question: 'Vou precisar expor algo da minha vida pessoal?',
        answer:
          'Não. Tudo é conduzido com respeito. O silêncio é bem-vindo. Você participa no seu ritmo, sem pressões. Nenhum participante será forçado a compartilhar nada que não queira. As vivências são conduzidas de forma segura, acolhedora e individual, sempre respeitando seus limites emocionais e espirituais.',
      },
      {
        question: 'Moro fora do Brasil. Posso participar da imersão?',
        answer:
          'Sim. É comum recebermos participantes de outros países, como Itália, Jerusalém, Portugal e outros, mesmo sem fluência em português. Durante a imersão, um dos professores realiza traduções em momentos-chave, garantindo que todos acompanhem com tranquilidade.',
      },
    ],
  },
  nextClass: {
    eyebrow: 'Próxima Turma',
    title: 'Um grupo **íntimo**. Um espaço **seguro**.',
    text: 'Esta imersão foi feita para ser vivida em profundidade, e por isso as **vagas são extremamente limitadas**.',
    details: [
      { icon: 'users', text: 'Turma com no máximo 16 participantes' },
      { icon: 'map', text: 'Rua Joaquim de Almeida, 371 - Mirandópolis, São Paulo - SP' },
      { icon: 'calendar', text: 'Data: a definir' },
      { icon: 'clock', text: 'Duração: 8 horas com Certificação' },
      { icon: 'book', text: 'Com apostila inclusa' },
      { icon: 'coffee', text: 'Refeição (almoço) + Coffee Break' },
    ],
    cta: 'Reservar Minha Vaga',
    note: 'Vagas limitadas • Certificação inclusa',
  },
}
