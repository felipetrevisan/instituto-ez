import { at, defineMigration, set } from 'sanity/migrate'

type PortableSpan = {
  _key: string
  _type: 'span'
  text: string
  marks: string[]
}

type PortableBlock = {
  _key: string
  _type: 'block'
  style: 'normal'
  markDefs: []
  children: PortableSpan[]
}

type LocalizedPortableTextValue = {
  _key?: string
  _type?: 'localePortableTextValue'
  lang?: string
  value?: PortableBlock[]
}

type HomeServicesSection = {
  _type?: string
  heading?: LocalizedPortableTextValue[]
  subheading?: LocalizedPortableTextValue[]
}

const headingPt: PortableBlock[] = [
  {
    _key: 'heading-pt-1',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'heading-pt-1-1',
        _type: 'span',
        text: 'Exercícios Neurocognitivos',
        marks: ['strong', 'primary'],
      },
      { _key: 'heading-pt-1-2', _type: 'span', text: ': O ', marks: [] },
      {
        _key: 'heading-pt-1-3',
        _type: 'span',
        text: 'Caminho Científico',
        marks: ['strong', 'accent'],
      },
      { _key: 'heading-pt-1-4', _type: 'span', text: ' para a ', marks: [] },
      {
        _key: 'heading-pt-1-5',
        _type: 'span',
        text: 'Saúde Mental',
        marks: ['strong', 'secondary'],
      },
    ],
  },
]

const subheadingPt: PortableBlock[] = [
  {
    _key: 'subheading-pt-1',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'subheading-pt-1-1',
        _type: 'span',
        text: 'Exercícios neurocognitivos estruturados',
        marks: ['strong', 'primary'],
      },
      {
        _key: 'subheading-pt-1-2',
        _type: 'span',
        text: ' para promover a ',
        marks: [],
      },
      {
        _key: 'subheading-pt-1-3',
        _type: 'span',
        text: 'regulação de desequilíbrios mentais e emocionais',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'subheading-pt-1-4',
        _type: 'span',
        text: ', como estresse crônico, falta de direção, ansiedade, depressão, burnout e outros padrões que comprometem o equilíbrio psicológico e a clareza mental.',
        marks: [],
      },
    ],
  },
  {
    _key: 'subheading-pt-2',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'subheading-pt-2-1',
        _type: 'span',
        text: 'Os efeitos tornam-se perceptíveis já na primeira sessão',
        marks: ['strong', 'secondary'],
      },
      {
        _key: 'subheading-pt-2-2',
        _type: 'span',
        text: ', com alterações observáveis nos padrões mentais e emocionais. Essas mudanças impactam diretamente a ',
        marks: [],
      },
      {
        _key: 'subheading-pt-2-3',
        _type: 'span',
        text: 'clareza nas decisões',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'subheading-pt-2-4',
        _type: 'span',
        text: ' e a qualidade de vida.',
        marks: [],
      },
    ],
  },
  {
    _key: 'subheading-pt-3',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'subheading-pt-3-1',
        _type: 'span',
        text: 'O método é reconhecido por profissionais da área da saúde',
        marks: ['strong', 'primary'],
      },
      {
        _key: 'subheading-pt-3-2',
        _type: 'span',
        text: ' como recurso complementar no cuidado à saúde mental. Cada processo é estruturado de forma individualizada, com anamnese criteriosa e condução sob responsabilidade técnica do ',
        marks: [],
      },
      {
        _key: 'subheading-pt-3-3',
        _type: 'span',
        text: 'neurocientista Enzo Pasqualetti',
        marks: ['strong', 'secondary'],
      },
      { _key: 'subheading-pt-3-4', _type: 'span', text: '.', marks: [] },
    ],
  },
]

function upsertPtValue(
  values: LocalizedPortableTextValue[] | undefined,
  value: PortableBlock[],
): LocalizedPortableTextValue[] {
  const current = Array.isArray(values) ? values : []
  const index = current.findIndex((item) => item?.lang === 'pt')

  if (index === -1) {
    return [...current, { _type: 'localePortableTextValue', lang: 'pt', value }]
  }

  return current.map((item, itemIndex) => {
    if (itemIndex !== index) return item
    return { ...item, lang: 'pt', value }
  })
}

export default defineMigration({
  title: 'Update home services heading and subheading in pt locale',
  documentTypes: ['landingPage'],
  migrate: {
    document(document) {
      if (!document || document.key !== 'home') return []
      if (!Array.isArray(document.sections)) return []

      let updated = false

      const sections = document.sections.map((section) => {
        const typedSection = section as HomeServicesSection

        if (!typedSection || typedSection._type !== 'home.services') {
          return section
        }

        updated = true

        return {
          ...typedSection,
          heading: upsertPtValue(typedSection.heading, headingPt),
          subheading: upsertPtValue(typedSection.subheading, subheadingPt),
        }
      })

      return updated ? [at('sections', set(sections))] : []
    },
  },
})
