import { BarChartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services.assessment',
  title: 'Assessment — Services',
  icon: BarChartIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'services',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Assessment' }
    },
  },
})
