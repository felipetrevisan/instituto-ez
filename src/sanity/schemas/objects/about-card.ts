import { MdMenu } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'about',
	title: 'Sobre Nós',
	icon: MdMenu,
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
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'background_image',
			title: 'Background Image',
			type: 'image',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
	],
});
