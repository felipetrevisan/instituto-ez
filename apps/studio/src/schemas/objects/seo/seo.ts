import { BarChartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../locale/locales'

export default defineType({
  name: 'seo',
  title: 'SEO',
  icon: BarChartIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'image',
      title: 'Open Graph Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
