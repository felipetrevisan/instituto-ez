import { InfoFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services.benefits',
  title: 'Benefits — Services',
  icon: InfoFilledIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'services',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'services.benefits.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Benefits' }
    },
  },
})
