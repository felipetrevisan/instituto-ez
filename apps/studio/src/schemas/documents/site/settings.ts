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
      name: 'keywords',
      title: 'Keywords',
      type: 'localizedString',
      group: ['seo'],
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
    defineField({
      name: 'social_nav',
      title: 'Social Navigation',
      description: 'Select a social network navigation',
      type: 'reference',
      group: ['navigation'],
      to: { type: 'navigation' },
      validation: (Rule) =>
        Rule.custom((_field, context) =>
          !context?.document?.social_nav ? 'Social networks links must be configured' : true,
        ).warning(),
    }),
    defineField({
      name: 'testimonials_type',
      title: 'Testimonials Type',
      type: 'string',
      group: ['others'],
      initialValue: 'ANIMATED',
      options: {
        list: [
          { title: 'Animated', value: 'ANIMATED' },
          { title: 'Minimalist', value: 'MINIMALIST' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'testimonials_variant',
      title: 'Testimonials Card Variant',
      type: 'string',
      initialValue: 'default',
      group: ['others'],
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Outline', value: 'outline' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'testimonials_theme',
      title: 'Testimonials Card Theme',
      type: 'string',
      initialValue: 'default',
      group: ['others'],
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Tertiary', value: 'tertiary' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'testimonials_rounded',
      title: 'Testimonals Card Border Rounded',
      type: 'string',
      initialValue: 'full',
      group: ['others'],
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Full', value: 'full' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
          { title: '2x Extra Large', value: '2xl' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form',
      group: ['contact'],
      type: 'reference',
      to: [{ type: 'contactForm' }],
      description: 'Select a contact form to display.',
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
