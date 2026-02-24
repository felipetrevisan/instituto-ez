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
      name: 'display_areas',
      title: 'Display Areas',
      description: 'Select where this testimonial should appear.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'Home', value: 'home' },
              { title: 'Masterclass (specific)', value: 'masterclass' },
              { title: 'Ebook (specific)', value: 'ebook' },
            ],
            layout: 'dropdown',
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).warning('Select at least one display area.'),
    }),
    defineField({
      name: 'masterclass_page',
      title: 'Masterclass Page',
      description: 'Select a specific masterclass page',
      type: 'reference',
      to: [{ type: 'masterclass' }],
      hidden: ({ parent }) => !parent?.display_areas?.includes('masterclass'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { display_areas?: string[] } | undefined
          if (parent?.display_areas?.includes('masterclass') && !value) {
            return 'Select a masterclass page when "Masterclass (specific)" is selected.'
          }
          return true
        }),
    }),
    defineField({
      name: 'ebook_page',
      title: 'Ebook Page',
      description: 'Select a ebook page',
      type: 'reference',
      to: [{ type: 'ebook' }],
      hidden: ({ parent }) => !parent?.display_areas?.includes('ebook'),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { display_areas?: string[] } | undefined
          if (parent?.display_areas?.includes('ebook') && !value) {
            return 'Select an ebook page when "Ebook (specific)" is selected.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'author_name',
      subtitle: 'display_areas.0',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title,
      }
    },
  },
})
