import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services.assessment',
  title: 'Assessment — Services',
  icon: PackageIcon,
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
