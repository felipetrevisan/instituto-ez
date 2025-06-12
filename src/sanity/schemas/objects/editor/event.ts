import config from '@/config/editor';
import { CalendarIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
	name: 'event',
	type: 'object',
	title: 'Event',
	icon: CalendarIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: config,
			validation: (Rule) =>
				Rule.required().warning('This field must not be empty.'),
		},
		{
			name: 'location',
			title: 'Location',
			type: 'string',
		},
		{
			name: 'showMap',
			title: 'Show Map?',
			type: 'boolean',
			initialValue: false,
			options: {
				list: [
					{ title: 'Yes', value: true },
					{ title: 'No', value: false },
				],
				layout: 'switch',
			},
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title }) {
			return {
				title: `Título: ${title || 'Sem Título'}`,
			};
		},
	},
});
