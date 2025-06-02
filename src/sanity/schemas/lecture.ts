import config from '@/config/editor';
import {
	orderRankField,
	orderRankOrdering,
} from '@sanity/orderable-document-list';
import { MdRequestQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'lecture',
	title: 'Palestras',
	icon: MdRequestQuote,
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: 'lecture' }),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: config,
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
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
