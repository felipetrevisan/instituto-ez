import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.mentorship',
  title: 'Mentor Ship — Home',
  icon: UserIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'home',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'mainBox', type: 'home.mentorship.items' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'home.mentorship.items' }],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(3).warning('Ideally keep a maximum of 3 CTAs'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Mentor Ship' }
    },
  },
})
