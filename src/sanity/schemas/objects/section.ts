import { MdMenu } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'section',
	title: 'Seção',
	icon: MdMenu,
	type: 'document',
	fields: [
		defineField({
			name: 'key_section',
			title: 'Section Key',
			type: 'string',
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		}),
		defineField({
			name: 'section_title',
			title: 'Section Title',
			type: 'string',
		}),
		defineField({
			name: 'section_subtitle',
			title: 'Section Subtitle',
			type: 'string',
		}),
		defineField({
			name: 'show_section',
			title: 'Show Section',
			type: 'boolean',
		}),
	],
});
