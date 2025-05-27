import {
	orderRankField,
	orderRankOrdering,
} from '@sanity/orderable-document-list';
import { MdRequestQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';
import { blockDecorators } from '../lib/portable-components';

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
			of: [
				{
					type: 'block',
					lists: [],
					styles: [],
					marks: {
						decorators: blockDecorators,
						annotations: [],
					},
				},
			],
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
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
