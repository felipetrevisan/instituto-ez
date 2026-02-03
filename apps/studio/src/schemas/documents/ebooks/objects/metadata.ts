import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'type',
      title: 'Value Type',
      initialValue: 'string',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'string' },
          { title: 'Number', value: 'number' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'prefix',
      title: 'Text Prefix',
      type: 'localizedString',
    }),
    defineField({
      name: 'suffix',
      title: 'Text Suffix',
      type: 'localizedString',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localizedString',
      hidden: ({ parent }) => parent?.type !== 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      hidden: ({ parent }) => parent?.type !== 'number',
    }),
    defineField({
      name: 'media',
      title: 'Icon',
      type: 'media',
    }),
  ],
  preview: {
    select: {
      title: `title`,
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
      }
    },
  },
})
