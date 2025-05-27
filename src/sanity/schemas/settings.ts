import { MdSettingsApplications } from 'react-icons/md';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'siteConfig',
	title: 'Site Settings',
	icon: MdSettingsApplications,
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
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Site Title',
			type: 'string',
			group: ['site', 'seo'],
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'description',
			title: 'Site Description',
			type: 'string',
			group: ['site', 'seo'],
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'keywords',
			title: 'Keywords',
			type: 'string',
			group: ['seo'],
			validation: (Rule) =>
				Rule.required().warning('As palavras chaves é obrigatória.'),
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
					title: 'About',
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
					name: 'training',
					type: 'section',
					title: 'Treinamentos',
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
				Rule.custom((field, context) =>
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
				Rule.custom((field, context) =>
					!context?.document?.main_nav && !context?.document?.social_nav
						? 'Social networks links must be configured'
						: true,
				).warning(),
		}),
	],
});
