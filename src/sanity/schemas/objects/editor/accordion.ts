import AccordionPreviewComponent from '@/sanity/lib/components/preview/accordion';
import { MenuIcon } from '@sanity/icons';
import { FaQuestion } from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
	name: 'accordion',
	type: 'object',
	title: 'Accordion',
	icon: MenuIcon,
	components: {
		block: AccordionPreviewComponent,
	},
	fields: [
		{
			name: 'theme',
			title: 'Theme',
			type: 'string',
			initialValue: 'default',
			options: {
				list: [
					{ title: 'Default', value: 'default' },
					{ title: 'Secondary', value: 'secondary' },
					{ title: 'Tertiary', value: 'tertiary' },
				],
				layout: 'dropdown',
			},
		},
		{
			name: 'rounded',
			title: 'Border Rounded',
			type: 'string',
			initialValue: 'full',
			options: {
				list: [
					{ title: 'None', value: 'none' },
					{ title: 'Full', value: 'full' },
					{ title: 'Large', value: 'lg' },
					{ title: 'Extra Large', value: 'xl' },
					{ title: '2x Extra Large', value: '2xl' },
				],
				layout: 'dropdown',
			},
		},
		{
			name: 'size',
			title: 'Size',
			type: 'string',
			initialValue: 'sm',
			options: {
				list: [
					{ title: 'Default', value: 'default' },
					{ title: 'Small', value: 'sm' },
					{ title: 'Large', value: 'lg' },
					{ title: 'Extra Large', value: 'xl' },
				],
				layout: 'dropdown',
			},
		},
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
			theme: 'theme',
			size: 'size',
			rounded: 'rounded',
		},
		prepare({ title, theme, size, rounded }) {
			return {
				title: `Accordion -> ${title}`,
				subtitle: `Tema: ${theme || 'default'} -> Size: ${size} -> Rounded: ${rounded}`,
				media: FaQuestion,
			};
		},
	},
});
