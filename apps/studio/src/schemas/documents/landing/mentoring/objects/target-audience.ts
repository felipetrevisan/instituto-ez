import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mentoring.targetaudience',
  title: 'Target Audience — Mentoring',
  icon: UserIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mentoring',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Target Audience' }
    },
  },
})
