import {
	orderRankField,
	orderRankOrdering,
} from '@sanity/orderable-document-list';
import { MdGroupWork, MdRequestQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'ebooks-collection',
	title: 'Ebooks Collection',
	icon: MdGroupWork,
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: 'ebooks-collection' }),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'ebooks',
			title: 'Ebooks',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'ebook' } }],
		}),
	],
});
