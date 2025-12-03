import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  fields: [
    defineField({
      name: 'hash',
      title: 'Hash',
      type: 'localizedString',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'image',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'background_title',
      title: 'Background Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'background_type',
      title: 'Background Type',
      type: 'string',
      initialValue: 'VIDEO',
      options: {
        list: [
          { title: 'Video', value: 'VIDEO' },
          { title: 'Image', value: 'IMAGE' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      hidden: ({ parent }) => parent?.background_type !== 'VIDEO',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.background_type === 'VIDEO' && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.background_type !== 'IMAGE',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.background_type === 'IMAGE' && !field) {
            return 'This field must not be empty.'
          }
          return true
        }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedArray',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
