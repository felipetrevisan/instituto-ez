import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webnario.finalCta',
  title: 'Final CTA',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'webnario.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({ name: 'subtext', type: 'localizedArray' }),
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
      return { title: 'Final CTA' }
    },
  },
})
