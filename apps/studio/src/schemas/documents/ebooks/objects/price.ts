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
      name: 'regular_text',
      title: 'Regular Text',
      type: 'localizedString',
      hidden: ({ parent }) => parent?.discount,
    }),
    defineField({
      name: 'discount',
      title: 'Price with Discount?',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'price_off_text',
      title: 'Price Off Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'price_by_text',
      title: 'Price By Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'discount_text',
      title: 'Discount Text',
      type: 'localizedString',
      hidden: ({ parent }) => !parent?.discount,
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
    defineField({
      name: 'price_regular_color',
      title: 'Price Regular Color',
      type: 'price_badge_color',
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'price_free_color',
      title: 'Price Free Color',
      type: 'price_badge_color',
      options: { collapsible: true, collapsed: false },
    }),
  ],
})
