import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services.methodsessions',
  title: 'Method Sessions — Services',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'services',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'services.methodsessions.items' }],
    }),
    defineField({ name: 'footer', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Method Sessions' }
    },
  },
})
