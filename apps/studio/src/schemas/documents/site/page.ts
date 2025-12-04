import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../../objects/locale/locales'

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
      name: 'type',
      title: 'Tipo',
      type: 'string',
      initialValue: 'page',
      options: {
        list: [{ title: 'Page', value: 'page' }],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'section',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'pageSection' }],
      hidden: ({ parent }) => parent?.type !== 'page',
      validation: (Rule) => Rule.required().warning('Must have at least one section.'),
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
      hidden: ({ parent }) => parent?.type !== 'landing',
      validation: (Rule) =>
        Rule.custom((_field, context) =>
          !context?.document?.navigation ? 'Main navigation must be configured.' : true,
        ).warning(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled?',
      type: 'boolean',
      initialValue: true,
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
