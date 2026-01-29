import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'webnario-landing-page-settings',
  title: 'Webnario Landing Page Settings',
  icon: BlockContentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Landing Page Sections',
      type: 'array',
      of: [
      ],
    }),
  ],
})
