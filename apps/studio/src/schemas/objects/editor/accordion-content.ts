import { MenuIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'accordionContentWidget',
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
