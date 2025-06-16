import AlertPreviewComponent from '@/sanity/lib/components/preview/alert';
import { WarningFilledIcon } from '@sanity/icons';
import * as Icons from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
	name: 'alert',
	type: 'object',
	title: 'Alert',
	icon: WarningFilledIcon,
	components: {
		block: AlertPreviewComponent,
	},
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'message',
			title: 'Message',
			type: 'text',
		},
		{
			name: 'variant',
			title: 'Variant',
			type: 'string',
			initialValue: 'default',
			options: {
				list: [
					{ title: 'Default', value: 'default' },
					{ title: 'Outline', value: 'outline' },
					{ title: 'Ghost', value: 'ghost' },
				],
				layout: 'dropdown',
			},
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
		{
			title: 'Icon',
			name: 'icon',
			type: 'iconPicker',
			options: {
				provider: 'fa',
				configurations: [
					{
						title: 'Font Awesome',
						provider: 'fa',
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						icons: (options: any) =>
							Object.entries(Icons).map(([name, Component]) => ({
								name,
								component: () => <Component width="1.5em" height="1em" />,
								tags: [name],
							})),
					},
				],
				outputFormat: 'react',
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			message: 'message',
		},
		prepare({ title, message }) {
			return {
				title: `Título: ${title || 'Sem Título'}`,
				subtitle: `${message || 'Sem Mensagem'}`,
			};
		},
	},
});
