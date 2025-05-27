import { MdRequestQuote } from 'react-icons/md';
import { defineField, defineType } from 'sanity';
import { annotations, blockDecorators } from '../lib/portable-components';

export default defineType({
	name: 'advanced-mentory',
	title: 'Mentoria Avançada',
	icon: MdRequestQuote,
	type: 'document',
	fields: [
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
			of: [
				{
					type: 'block',
					marks: {
						decorators: blockDecorators,
						annotations: annotations,
					},
				},
				{
					type: 'buttonLink',
				},
				{
					type: 'image',
				},
				{
					type: 'title',
				},
			],
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
		defineField({
			name: 'ribbon',
			title: 'Ribbon',
			type: 'ribbon',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
	],
});
