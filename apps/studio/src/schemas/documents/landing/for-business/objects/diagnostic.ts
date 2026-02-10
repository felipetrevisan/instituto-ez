import { BarChartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.diagnostic',
  title: 'Diagnostic — For Business',
  icon: BarChartIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'for-business',
  fields: [
    defineField({ name: 'heading', type: 'localizedString' }),
    defineField({ name: 'subheading', type: 'localizedText' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'forbusiness.diagnostic.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Diagnostic' }
    },
  },
})
