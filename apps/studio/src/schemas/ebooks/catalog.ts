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
      name: 'seo',
      title: 'SEO',
    },
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
      title: 'Themes',
    },
    {
      name: 'questions',
      title: 'Questions',
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
      name: 'seoDescription',
      title: 'Description',
      type: 'string',
      group: ['seo'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Keywords',
      type: 'string',
      group: ['seo'],
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
      name: 'overview',
      title: 'Overview',
      type: 'ebooksOverview',
    }),
    defineField({
      name: 'index',
      title: 'Index',
      type: 'ebooksIndex',
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
      name: 'questions',
      title: 'Questions',
      type: 'array',
      group: ['questions'],
      of: [{ type: 'accordion-content' }],
      validation: (Rule) => Rule.required().warning('Must have at least one content.'),
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
