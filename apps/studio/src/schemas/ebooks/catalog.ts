import { BlockContentIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebook',
  title: 'Ebooks',
  icon: BlockContentIcon,
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    {
      name: 'cover',
      title: 'Cover Images',
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
    {
      name: 'chapters',
      title: 'Chapters',
    },
    {
      name: 'theme',
      title: 'Theme',
    },
    {
      name: 'link',
      title: 'Link',
    },
  ],
  fields: [
    orderRankField({ type: 'ebook' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'data',
      title: 'Metadata',
      type: 'array',
      group: ['metadata'],
      of: [{ type: 'metadata' }],
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      group: ['chapters'],
      of: [{ type: 'chapters' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'cover-image',
      group: ['cover'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      group: ['theme'],
    }),
    defineField({
      name: 'disabled',
      title: 'Disable?',
      type: 'boolean',
      initialValue: true,
      group: ['link'],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      group: ['link'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
