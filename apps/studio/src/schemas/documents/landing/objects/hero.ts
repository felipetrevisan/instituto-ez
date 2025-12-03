import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section.hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({ name: 'description', type: 'localizedArray' }),
    defineField({ name: 'image', type: 'image' }),
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
      return { title: 'Hero' }
    },
  },
})
