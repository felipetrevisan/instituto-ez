import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.faq.item',
  title: 'FAQ — Item - Immersion',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'question', type: 'localizedString' }),
    defineField({ name: 'answer', type: 'localizedText' }),
  ],
  preview: {
    select: {
      title: 'question.pt',
    },
    prepare({ title }) {
      return { title: title || 'Pergunta' }
    },
  },
})
