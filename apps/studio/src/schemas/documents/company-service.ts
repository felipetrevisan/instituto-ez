import config from '@ez/studio/config/editor'
import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../objects/locale/locales'

export default defineType({
  name: 'mathematizer',
  title: 'Serviços para Empresas',
  icon: BlockContentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedArray',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
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
