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

type HomeMathematizerSection = {
  _type?: string
  subheading?: LocalizedPortableTextValue[]
}

const subheadingPt: PortableBlock[] = [
  {
    _key: 'mathematizer-subheading-pt-1',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'mathematizer-subheading-pt-1-1',
        _type: 'span',
        text: 'O Sistema Neuroanalítico',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'mathematizer-subheading-pt-1-2',
        _type: 'span',
        text: ' converte percepções subjetivas em ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-1-3',
        _type: 'span',
        text: 'métricas objetivas',
        marks: ['strong', 'cyan'],
      },
      {
        _key: 'mathematizer-subheading-pt-1-4',
        _type: 'span',
        text: ', permitindo que a empresa identifique com clareza o que funciona, o que compromete desempenho e onde concentrar ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-1-5',
        _type: 'span',
        text: 'ajustes estratégicos',
        marks: ['strong', 'accent'],
      },
      { _key: 'mathematizer-subheading-pt-1-6', _type: 'span', text: '.', marks: [] },
    ],
  },
  {
    _key: 'mathematizer-subheading-pt-2',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'mathematizer-subheading-pt-2-1',
        _type: 'span',
        text: 'A metodologia aplica ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-2-2',
        _type: 'span',
        text: 'modelagem matemática',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'mathematizer-subheading-pt-2-3',
        _type: 'span',
        text: ' para avaliar processos, dinâmica organizacional e variáveis emocionais dos colaboradores, mensurando comunicação, liderança, clima e bem-estar por meio de ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-2-4',
        _type: 'span',
        text: 'parâmetros quantitativos estruturados',
        marks: ['strong', 'cyan'],
      },
      { _key: 'mathematizer-subheading-pt-2-5', _type: 'span', text: '.', marks: [] },
    ],
  },
  {
    _key: 'mathematizer-subheading-pt-3',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'mathematizer-subheading-pt-3-1',
        _type: 'span',
        text: 'Em ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-3-2',
        _type: 'span',
        text: 'até 3 semanas',
        marks: ['strong', 'cyan'],
      },
      {
        _key: 'mathematizer-subheading-pt-3-3',
        _type: 'span',
        text: ', entregamos um ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-3-4',
        _type: 'span',
        text: 'diagnóstico técnico',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'mathematizer-subheading-pt-3-5',
        _type: 'span',
        text: ' que orienta decisões estratégicas, otimiza processos e fortalece a performance da equipe. ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-3-6',
        _type: 'span',
        text: 'Dados estruturados',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'mathematizer-subheading-pt-3-7',
        _type: 'span',
        text: ' convertem percepções isoladas em ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-3-8',
        _type: 'span',
        text: 'diretrizes objetivas de decisão',
        marks: ['strong', 'cyan'],
      },
      {
        _key: 'mathematizer-subheading-pt-3-9',
        _type: 'span',
        text: ', permitindo que sua empresa avance com ',
        marks: [],
      },
      {
        _key: 'mathematizer-subheading-pt-3-10',
        _type: 'span',
        text: 'precisão e segurança',
        marks: ['strong', 'accent'],
      },
      { _key: 'mathematizer-subheading-pt-3-11', _type: 'span', text: '.', marks: [] },
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
  title: 'Update home mathematizer subheading in pt locale',
  documentTypes: ['landingPage'],
  migrate: {
    document(document) {
      if (!document || document.key !== 'home') return []
      if (!Array.isArray(document.sections)) return []

      let updated = false

      const sections = document.sections.map((section) => {
        const typedSection = section as HomeMathematizerSection

        if (!typedSection || typedSection._type !== 'home.mathematizer') {
          return section
        }

        updated = true

        return {
          ...typedSection,
          subheading: upsertPtValue(typedSection.subheading, subheadingPt),
        }
      })

      return updated ? [at('sections', set(sections))] : []
    },
  },
})
