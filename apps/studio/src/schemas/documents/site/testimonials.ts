import config from '@ez/studio/config/editor'
import { BlockContentIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Depoimentos',
  icon: BlockContentIcon,
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'testimonial' }),
    defineField({
      name: 'author_name',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'author_role',
      title: 'Author Role / Location',
      type: 'string',
      description: 'Ex: Empreendedora, São Paulo',
    }),
    defineField({
      name: 'show_stars',
      title: 'Show Stars?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      hidden: ({ parent }) => parent?.show_stars === false,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'array',
      of: config,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'Sobre', value: 'about' },
              { title: 'Imersão', value: 'immersion' },
              { title: 'Palestras', value: 'lecture' },
              { title: 'Atendimentos', value: 'service' },
              { title: 'Matematizador', value: 'mathematizer' },
              { title: 'Depoimentos', value: 'testimonial' },
              { title: 'Ebooks', value: 'ebook' },
              { title: 'Workshops', value: 'workshop' },
              { title: 'Mentoria Avançada', value: 'advanced-mentory' },
              { title: 'Masterclass', value: 'masterclass' },
            ],
            layout: 'dropdown',
          },
        }),
      ],
    }),
    defineField({
      name: 'ebook_page',
      title: 'Ebook Page',
      description: 'Select a ebook page',
      type: 'reference',
      to: [{ type: 'ebook' }],
      hidden: ({ parent }) => !parent?.categories?.includes('ebook'),
    }),
  ],
  preview: {
    select: {
      title: 'author_name',
      subtitle: 'categories.0',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title,
      }
    },
  },
})
