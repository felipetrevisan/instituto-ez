import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Páginas',
  icon: PackageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
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
      name: 'description',
      title: 'Page Description',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'section',
      title: 'Sections',
      type: 'array',
      of: [{ type: 'pageSection' }],
      validation: (Rule) => Rule.required().warning('Must have at least one section.'),
    }),
  ],
})
