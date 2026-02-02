import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mentoring.intro',
  title: 'Intro — Mentoring',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mentoring',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Intro' }
    },
  },
})
