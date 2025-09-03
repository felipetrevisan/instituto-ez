import { DownloadIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'price',
  title: 'Price',
  icon: DownloadIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'regular',
      title: 'Regular',
      type: 'number',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'discount',
      title: 'Price with Discount?',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'discount_price',
      title: 'Discount',
      type: 'number',
      hidden: ({ parent }) => !parent?.discount,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.discount && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
  ],
})
