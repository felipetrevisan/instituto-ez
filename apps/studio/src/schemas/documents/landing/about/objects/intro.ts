import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about.intro',
  title: 'Intro — About',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'about',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'about.intro.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Intro' }
    },
  },
})
