import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.courses.items',
  title: 'Courses — Items - For Business',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedString' }),
    defineField({ name: 'description', type: 'localizedString' }),
    defineField({ name: 'text', type: 'localizedText' }),
    defineField({
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Presencial', value: 'INPERSON' },
          { title: 'Remoto', value: 'REMOTE' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'time',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
    }),
    defineField({
      name: 'classname',
      title: 'CSS Class',
      type: 'string',
    }),
    defineField({
      name: 'cta',
      title: 'Call Action',
      type: 'button',
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
