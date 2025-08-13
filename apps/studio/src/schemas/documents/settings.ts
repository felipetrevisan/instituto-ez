import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      type: 'string',
      group: ['site', 'seo'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'string',
      group: ['site', 'seo'],
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      group: ['seo'],
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
      name: 'hero',
      title: 'About',
      type: 'array',
      group: ['home'],
      of: [
        defineArrayMember({
          name: 'about',
          type: 'about',
          title: 'About Us',
        }),
        defineArrayMember({
          name: 'our-mission',
          type: 'about',
          title: 'Our Mission',
        }),
        defineArrayMember({
          name: 'products',
          type: 'about',
          title: 'Services & Products',
        }),
      ],
    }),
    defineField({
      name: 'sections_home',
      title: 'Home Sections',
      type: 'array',
      group: ['home'],
      of: [
        defineArrayMember({
          name: 'banner',
          type: 'section',
          title: 'Banner',
        }),
        defineArrayMember({
          name: 'about',
          type: 'section',
          title: 'Sobre',
        }),
        defineArrayMember({
          name: 'immersion',
          type: 'section',
          title: 'Imersão',
        }),
        defineArrayMember({
          name: 'lecture',
          type: 'section',
          title: 'Palestras',
        }),
        defineArrayMember({
          name: 'service',
          type: 'section',
          title: 'Atendimentos',
        }),
        defineArrayMember({
          name: 'mathematizer',
          type: 'section',
          title: 'Matematizador',
        }),
        defineArrayMember({
          name: 'testimonial',
          type: 'section',
          title: 'Depoimentos',
        }),
        defineArrayMember({
          name: 'ebook',
          type: 'section',
          title: 'Ebooks',
        }),
        defineArrayMember({
          name: 'workshop',
          type: 'section',
          title: 'Workshops',
        }),
        defineArrayMember({
          name: 'advanced-mentory',
          type: 'section',
          title: 'Mentoria Avançada',
        }),
      ],
    }),
    defineField({
      name: 'main_nav',
      title: 'Main Navigation',
      description: 'Select a main navigation that is used in header',
      type: 'reference',
      group: ['navigation'],
      to: { type: 'navigation' },
      validation: (Rule) =>
        Rule.custom((_field, context) =>
          !context?.document?.main_nav && !context?.document?.social_nav
            ? 'Main navigation must be configured.'
            : true,
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
          !context?.document?.main_nav && !context?.document?.social_nav
            ? 'Social networks links must be configured'
            : true,
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
})
