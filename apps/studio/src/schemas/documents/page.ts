import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../objects/locale/locales'

export default defineType({
  name: 'page',
  title: 'Páginas',
  icon: PackageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
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
      name: 'section',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'pageSection' }],
      validation: (Rule) => Rule.required().warning('Must have at least one section.'),
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
