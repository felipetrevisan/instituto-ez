import { BlockContentIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Atendimentos',
  icon: BlockContentIcon,
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'service' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
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
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
