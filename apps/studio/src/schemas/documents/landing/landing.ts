import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { BlockContentIcon, CogIcon, HashIcon } from '@sanity/icons'
import { ViewIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: ViewIcon,
  groups: [
    { name: 'content', title: 'Content', icon: BlockContentIcon },
    { name: 'seo', title: 'SEO', icon: HashIcon },
    { name: 'settings', title: 'Settings', icon: CogIcon },
  ],
  fields: [
    defineField({
      name: 'key',
      title: 'Landing Key',
      type: 'string',
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Mathematizer', value: 'mathematizer' },
          { title: 'For Business', value: 'for-business' },
          { title: 'Mentoring', value: 'mentoring' },
          { title: 'About', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Digital Products', value: 'digital-products' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'localizedSlug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'form',
      title: 'Form',
      description: 'Select a form',
      type: 'reference',
      to: { type: 'contactForm' },
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      description: 'Select a main navigation that is used in header',
      type: 'reference',
      to: { type: 'navigation' },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        { type: 'section.hero' },

        // MATHEMATIZER
        { type: 'mathematizer.benefits' },
        { type: 'mathematizer.mathematizer' },
        { type: 'mathematizer.whatis' },
        { type: 'mathematizer.whycompanyneed' },
        { type: 'mathematizer.cta' },

        // FOR BUSINESS
        { type: 'forbusiness.diagnostic' },
        { type: 'forbusiness.consulting' },
        { type: 'forbusiness.courses' },
        { type: 'forbusiness.lectures' },
        { type: 'forbusiness.testimonial' },
        { type: 'forbusiness.cta' },

        // MENTORING
        { type: 'mentoring.expectedresults' },
        { type: 'mentoring.methodsstep' },
        { type: 'mentoring.intro' },
        { type: 'mentoring.targetaudience' },
        { type: 'mentoring.cta' },

        // ABOUT
        { type: 'about.intro' },
        { type: 'about.services' },
        { type: 'about.whychoose' },

        // SERVICES
        { type: 'services.assessment' },
        { type: 'services.benefits' },
        { type: 'services.methodsessions' },
        { type: 'services.whoisitfor' },
        { type: 'services.cta' },

        // HOME
        { type: 'home.services' },
        { type: 'home.mentorship' },
        { type: 'home.mathematizer' },
        { type: 'home.development' },
        { type: 'home.digitalproducts' },
        { type: 'home.immersion' },

        // DIGITAL PRODUCTS
        { type: 'digital-products.hero' },
        { type: 'digital-products.ebooks' },
        { type: 'digital-products.webinar' },
        { type: 'digital-products.cta' }
      ],
    }),
  ],
  preview: {
    select: {
      title: `page.title.${i18n.base}`,
      key: 'key',
    },
    prepare({ title, key }) {
      return {
        title,
        subtitle: key,
      }
    },
  },
})
