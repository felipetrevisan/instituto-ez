import { TextIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
	name: 'title',
	type: 'object',
	title: 'Title',
	icon: TextIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		},
		{
			name: 'variant',
			title: 'Variant',
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
			name: 'size',
			title: 'Size',
			type: 'string',
			initialValue: 'small',
			options: {
				list: [
					{ title: 'Default', value: 'default' },
					{ title: 'Small', value: 'sm' },
					{ title: 'Large', value: 'lg' },
					{ title: 'Extra Large', value: 'xl' },
					{ title: '2x Extra Large', value: '2xl' },
				],
				layout: 'dropdown',
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
      size: 'size'
		},
		prepare({ title, subtitle, size }) {
			return {
				title: `Título: ${title || 'Sem texto'}`,
				subtitle: `${subtitle} → ${size}`,
			};
		},
	},
});
