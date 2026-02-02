import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { MenuIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'accordion-content-landing-page',
  type: 'object',
  title: 'Content',
  icon: MenuIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'localizedText',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    },
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
    },
    prepare({ title }) {
      return {
        title: `Título: ${title || 'Sem titulo'}`,
      }
    },
  },
})
