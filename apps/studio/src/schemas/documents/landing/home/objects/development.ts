import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.development',
  title: 'Development — Home',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'home',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'mainBox', type: 'home.development.items' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'home.development.items' }],
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
      return { title: 'Development' }
    },
  },
})
