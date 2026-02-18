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

type HomeImmersionSection = {
  _type?: string
  subheading?: LocalizedPortableTextValue[]
}

const subheadingPt: PortableBlock[] = [
  {
    _key: 'immersion-subheading-pt-1',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'immersion-subheading-pt-1-1',
        _type: 'span',
        text: 'Uma experiência presencial de um dia',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'immersion-subheading-pt-1-2',
        _type: 'span',
        text: ' que integra fundamentos da ',
        marks: [],
      },
      {
        _key: 'immersion-subheading-pt-1-3',
        _type: 'span',
        text: 'neurociência, espiritualidade e autoconsciência',
        marks: ['strong', 'cyan'],
      },
      {
        _key: 'immersion-subheading-pt-1-4',
        _type: 'span',
        text: ', com práticas voltadas à reorganização emocional, ampliação da clareza interna e aprofundamento da conexão pessoal.',
        marks: [],
      },
    ],
  },
  {
    _key: 'immersion-subheading-pt-2',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'immersion-subheading-pt-2-1',
        _type: 'span',
        text: 'O evento é inter-religioso, aberto a todas as crenças e religiões',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'immersion-subheading-pt-2-2',
        _type: 'span',
        text: ', oferecendo um ',
        marks: [],
      },
      {
        _key: 'immersion-subheading-pt-2-3',
        _type: 'span',
        text: 'ambiente respeitoso e seguro',
        marks: ['strong', 'cyan'],
      },
      {
        _key: 'immersion-subheading-pt-2-4',
        _type: 'span',
        text: ' para reflexão e fortalecimento da consciência individual. Uma imersão que transcende o desenvolvimento pessoal convencional, com foco na ',
        marks: [],
      },
      {
        _key: 'immersion-subheading-pt-2-5',
        _type: 'span',
        text: 'expansão da consciência',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'immersion-subheading-pt-2-6',
        _type: 'span',
        text: ', no aprofundamento da ',
        marks: [],
      },
      {
        _key: 'immersion-subheading-pt-2-7',
        _type: 'span',
        text: 'autopercepção',
        marks: ['strong', 'cyan'],
      },
      {
        _key: 'immersion-subheading-pt-2-8',
        _type: 'span',
        text: ', no fortalecimento da ',
        marks: [],
      },
      {
        _key: 'immersion-subheading-pt-2-9',
        _type: 'span',
        text: 'conexão interior',
        marks: ['strong', 'accent'],
      },
      {
        _key: 'immersion-subheading-pt-2-10',
        _type: 'span',
        text: ' e na ',
        marks: [],
      },
      {
        _key: 'immersion-subheading-pt-2-11',
        _type: 'span',
        text: 'integração entre mente, corpo e espírito',
        marks: ['strong', 'cyan'],
      },
      { _key: 'immersion-subheading-pt-2-12', _type: 'span', text: '.', marks: [] },
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
  title: 'Update home immersion subheading in pt locale',
  documentTypes: ['landingPage'],
  migrate: {
    document(document) {
      if (!document || document.key !== 'home') return []
      if (!Array.isArray(document.sections)) return []

      let updated = false

      const sections = document.sections.map((section) => {
        const typedSection = section as HomeImmersionSection

        if (!typedSection || typedSection._type !== 'home.immersion') {
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
