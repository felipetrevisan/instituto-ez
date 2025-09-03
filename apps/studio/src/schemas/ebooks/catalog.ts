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
      name: 'overview',
      title: 'Overview',
    },
    {
      name: 'index',
      title: 'Index',
    },
    {
      name: 'theme',
      title: 'Theme',
    },
    {
      name: 'questions',
      title: 'Questions',
    },
    {
      name: 'link',
      title: 'Link',
    },
    {
      name: 'price',
      title: 'Price',
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
      name: 'download',
      title: 'Download',
      type: 'download_link',
      group: ['link'],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'ebooksOverview',
      group: ['overview'],
    }),
    defineField({
      name: 'index',
      title: 'Index',
      type: 'ebooksIndex',
      group: ['index'],
    }),
    defineField({
      name: 'data',
      title: 'Metadata',
      type: 'array',
      group: ['metadata'],
      of: [{ type: 'metadata' }],
    }),
    defineField({
      name: 'chapter',
      title: 'Chapters',
      type: 'chapter',
      group: ['chapters'],
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
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      group: ['link'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'price',
      group: ['price'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
  preview: {
    select: {
      image: 'images.small_image',
      title: 'title',
    },
    prepare({ image, title }) {
      return {
        media: image,
        title,
      }
    },
  },
})
