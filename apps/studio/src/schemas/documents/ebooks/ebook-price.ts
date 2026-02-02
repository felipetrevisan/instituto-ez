import { DownloadIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebookPrice',
  title: 'Ebook Price',
  type: 'document',
  icon: DownloadIcon,
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
  ],
  preview: {
    select: {
      id: '_id',
      regular: 'regular',
    },
    prepare({ id, regular }) {
      return {
        title: id,
        subtitle: typeof regular === 'number' ? `R$ ${regular}` : undefined,
      }
    },
  },
})
