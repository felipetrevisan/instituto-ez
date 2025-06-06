import config from '@/config/editor';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'pageSection',
	title: 'Page Section',
	type: 'object',
	fields: [
		defineField({
			name: 'background',
			title: 'Background',
			type: 'image',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'background_title',
			title: 'Background Title',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'hash',
			title: 'Hash',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'video',
			title: 'Video URL',
			type: 'url',
			validation: (Rule) =>
				Rule.required()
					.uri({
						scheme: ['http', 'https'],
					})
					.warning('This field must be a valid url.'),
		}),
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
	],
});
