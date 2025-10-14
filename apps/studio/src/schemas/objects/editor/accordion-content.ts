import { MenuIcon } from '@sanity/icons'
import { defineType } from 'sanity'
import { i18n } from '../locale/locales'

export default defineType({
  name: 'accordion-content',
  type: 'object',
  title: 'Content',
  icon: MenuIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `Título: ${title || 'Sem titulo'}`,
      }
    },
  },
})
