import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.digitalproducts',
  title: 'Digital Products — Home',
  icon: ImagesIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'home',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'home.digitalproducts.card' }],
      validation: (Rule) => Rule.max(2).warning('Ideal: 2 cards'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Digital Products' }
    },
  },
})
