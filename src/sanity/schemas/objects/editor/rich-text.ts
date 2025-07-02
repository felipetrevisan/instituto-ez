import { annotations, basicDecorators } from '@/sanity/lib/portable-components';
import { defineType } from 'sanity';

export default defineType({
	name: 'listItemRichText',
	title: 'Items',
	type: 'object',
	fields: [
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{
					type: 'block',
					marks: {
						decorators: basicDecorators,
						annotations,
					},
				},
			],
		},
	],
});
