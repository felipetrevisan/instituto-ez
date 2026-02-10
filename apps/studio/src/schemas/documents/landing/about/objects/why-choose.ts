import { EyeOpenIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about.whychoose',
  title: 'Why Choose — About',
  icon: EyeOpenIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'about',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'description', type: 'localizedArray' }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Why Choose' }
    },
  },
})
