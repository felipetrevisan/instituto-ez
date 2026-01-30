import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass-landing-page-settings',
  title: 'Masterclass Landing Page Settings',
  icon: BlockContentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Landing Page Sections',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'header',
          type: 'landing-page-section',
          title: 'Header',
        }),
        defineArrayMember({
          name: 'stats',
          type: 'landing-page-section',
          title: 'Stats',
        }),
        defineArrayMember({
          name: 'index',
          type: 'landing-page-section',
          title: 'Conheca a Masterclass',
        }),
        defineArrayMember({
          name: 'overview',
          type: 'landing-page-section',
          title: 'Visao Geral',
        }),
        defineArrayMember({
          name: 'testimonial',
          type: 'landing-page-section',
          title: 'Depoimentos',
        }),
        defineArrayMember({
          name: 'question',
          type: 'landing-page-section',
          title: 'Perguntas Frequentes',
        }),
        defineArrayMember({
          name: 'author',
          type: 'landing-page-section',
          title: 'Autores',
        }),
        defineArrayMember({
          name: 'footer',
          type: 'landing-page-section',
          title: 'Compra e Garantia',
        }),
      ],
    }),
    defineField({
      name: 'seals_image',
      title: 'Seals Image',
      type: 'array',
      of: [{ type: 'seal' }],
    }),
  ],
})
