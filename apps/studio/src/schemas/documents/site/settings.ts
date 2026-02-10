import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../../objects/locale/locales'

export default defineType({
  name: 'siteConfig',
  title: 'Site Settings',
  icon: CogIcon,
  type: 'document',
  groups: [
    {
      name: 'site',
      title: 'Site',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'home',
      title: 'Home',
    },
    {
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'others',
      title: 'Others',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'localizedString',
      group: ['site', 'seo'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'localizedString',
      group: ['site', 'seo'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      description: 'Default Open Graph image for the site.',
      type: 'image',
      group: ['seo'],
      options: { hotspot: true },
    }),
    defineField({
      name: 'slogan',
      title: 'Site Slogan',
      type: 'localizedString',
      group: ['site'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: ['site'],
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'email',
      group: ['site', 'contact'],
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: ['site', 'contact'],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: ['site', 'contact'],
    }),
    defineField({
      name: 'main_nav',
      title: 'Header Navigation',
      description: 'Select a header navigation that is used in header',
      type: 'reference',
      group: ['navigation'],
      to: { type: 'navigation' },
      validation: (Rule) =>
        Rule.custom((_field, context) =>
          !context?.document?.main_nav ? 'Main navigation must be configured.' : true,
        ).warning(),
    }),
    defineField({
      name: 'footer_nav',
      title: 'Footer Navigation',
      description: 'Select a main navigation that is used in footer',
      type: 'reference',
      group: ['navigation'],
      to: { type: 'navigation' },
      validation: (Rule) =>
        Rule.custom((_field, context) =>
          !context?.document?.footer_nav ? 'Footer navigation must be configured.' : true,
        ).warning(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
      }
    },
  },
})
