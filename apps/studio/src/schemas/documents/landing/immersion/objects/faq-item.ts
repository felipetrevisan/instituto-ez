import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { MarkerIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.faq.item',
  title: 'FAQ — Item - Immersion',
  icon: MarkerIcon,
  type: 'object',
  fields: [
    defineField({ name: 'question', type: 'localizedString' }),
    defineField({ name: 'answer', type: 'localizedText' }),
  ],
  preview: {
    select: {
      title: 'question',
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return { title: localized?.value || title || 'Pergunta' }
    },
  },
})
