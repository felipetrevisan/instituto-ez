import config from '@/config/editor';
import {
	orderRankField,
	orderRankOrdering,
} from '@sanity/orderable-document-list';
import { MdRequestQuote } from 'react-icons/md';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'testimonial',
	title: 'Depoimentos',
	icon: MdRequestQuote,
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: 'testimonial' }),
		defineField({
			name: 'author_name',
			title: 'Author Name',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'testimonial',
			title: 'Testimonial',
			type: 'array',
			of: config,
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'string',
					options: {
						list: [
							{ title: 'Sobre', value: 'about' },
							{ title: 'Imersão', value: 'immersion' },
							{ title: 'Palestras', value: 'lecture' },
							{ title: 'Atendimentos', value: 'service' },
							{ title: 'Matematizador', value: 'mathematizer' },
							{ title: 'Depoimentos', value: 'testimonial' },
							{ title: 'Ebooks', value: 'ebook' },
							{ title: 'Workshops', value: 'workshop' },
							{ title: 'Mentoria Avançada', value: 'advanced-mentory' },
						],
						layout: 'dropdown',
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'author_name',
			subtitle: 'type',
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title,
			};
		},
	},
});
