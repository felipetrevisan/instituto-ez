import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webnario.expert.social',
  title: 'Expert Social',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'label' },
    prepare({ title }) {
      return { title }
    },
  },
})
