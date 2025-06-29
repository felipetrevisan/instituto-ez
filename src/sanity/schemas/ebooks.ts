import {
	orderRankField,
	orderRankOrdering,
} from '@sanity/orderable-document-list';
import { MdRequestQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'ebook',
	title: 'Ebooks',
	icon: MdRequestQuote,
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: 'ebook' }),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
		}),
		defineField({
			name: 'images',
			title: 'Images',
			type: 'cover-image',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'disabled',
			title: 'Disable?',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'button',
			title: 'Button',
			type: 'button',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
	],
});
