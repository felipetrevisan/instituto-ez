import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassDetailHero',
  title: 'Masterclass Hero',
  icon: PlayIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'portableText',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'YouTube URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'] }).warning('This field must be a valid url.'),
        }),
        defineField({
          name: 'duration',
          title: 'Duration',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hero' }
    },
  },
})
