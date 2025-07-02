import { CommentIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
	name: 'ebooksWidget',
	type: 'object',
	title: 'Ebooks',
	icon: CommentIcon,
	fields: [
		{
			name: 'grid',
			title: 'Grid',
			type: 'grid',
		},
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
	],
	preview: {
		select: {
			rows: 'grid.rows',
			columns: 'grid.columns',
		},
		prepare({ rows, columns }) {
			return {
				title: 'Ebooks',
				subtitle: `Grid ${rows} x ${columns}`,
			};
		},
	},
});
