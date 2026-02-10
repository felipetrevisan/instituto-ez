import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { BlockContentIcon, CogIcon, EyeOpenIcon, HashIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: EyeOpenIcon,
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
          { title: 'Immersion', value: 'immersion' },
          { title: 'Digital Products', value: 'digital-products' },
          { title: 'Masterclass', value: 'masterclass' },
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

        // IMMERSION
        { type: 'immersion.intro' },
        { type: 'immersion.experience' },
        { type: 'immersion.instructor' },
        { type: 'immersion.main-target' },
        { type: 'immersion.final-cta' },
        { type: 'immersion.faq' },
        { type: 'immersion.next-class' },

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
        { type: 'digital-products.cta' },

        // MASTERCLASS
        { type: 'masterclass.hero' },
        { type: 'masterclass.for-who' },
        { type: 'masterclass.problem' },
        { type: 'masterclass.expert' },
        { type: 'masterclass.final-cta' },
        { type: 'masterclass.catalog' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'page.title',
      key: 'key',
    },
    prepare({ title, key }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
        subtitle: key,
      }
    },
  },
})
