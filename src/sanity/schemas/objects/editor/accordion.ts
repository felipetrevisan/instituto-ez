import { MenuIcon } from '@sanity/icons';
import { FaQuestion } from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
	name: 'accordion',
	type: 'object',
	title: 'Accordion',
	icon: MenuIcon,
	fields: [
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [{ type: 'accordion-content' }],
			validation: (Rule) =>
				Rule.required().warning('Must have at least one content.'),
		},
	],
	preview: {
		select: {
			title: 'content.0.title',
		},
		prepare({ title }) {
			return {
				title: `Accordion -> ${title}`,
				media: FaQuestion,
			};
		},
	},
});
