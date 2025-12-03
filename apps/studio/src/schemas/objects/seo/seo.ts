import { BarChartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../locale/locales'

interface SeoValidationContext {
  parent?: {
    type?: string
  }
}

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
      name: 'slug',
      title: 'Page Slug',
      type: 'localizedSlug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'form',
      title: 'Form',
      description: 'Select a form',
      type: 'reference',
      to: { type: 'contactForm' },
      hidden: ({ parent }) => parent?.type !== 'landing',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      description: 'Select a main navigation that is used in header',
      type: 'reference',
      to: { type: 'navigation' },
      validation: (Rule) =>
        Rule.custom((field, context) => {
          const { parent } = context as SeoValidationContext

          if (parent?.type === 'landing' && !field) {
            return 'Main navigation must be configured.'
          }
          return true
        }).warning(),
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
