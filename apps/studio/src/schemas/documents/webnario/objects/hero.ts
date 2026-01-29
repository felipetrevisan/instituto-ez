import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webnario.hero',
  title: 'Hero',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'webnario.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({ name: 'description', type: 'localizedArray' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
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
      return { title: 'Hero' }
    },
  },
})
