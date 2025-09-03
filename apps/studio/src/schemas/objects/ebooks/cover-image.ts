import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cover-image',
  title: 'Cover Image',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'background_image',
      title: 'Background Image',
      type: 'image',
      description:
        'This image will be used as a background for the card image. Only in Ebooks Catalog. You can leave blank to use background transparent',
    }),
    defineField({
      name: 'small_image',
      title: 'Small Image',
      type: 'image',
    }),
    defineField({
      name: 'large_image',
      title: 'Large Image',
      type: 'image',
    }),
    defineField({
      name: 'footer_image',
      title: 'Footer Image',
      type: 'image',
    }),
  ],
})
