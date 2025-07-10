import config from '@/config/editor';
import { FolderIcon } from '@sanity/icons';
import * as Icons from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
	name: 'tabsWidget',
	type: 'object',
	title: 'Tabs',
	icon: FolderIcon,
	fields: [
		{
			name: 'tabs',
			type: 'array',
			title: 'Tabs',
			of: [
				{
					type: 'object',
					name: 'tab',
					title: 'Tab',
					fields: [
						{
							name: 'title',
							type: 'string',
							title: 'Title',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'id',
							type: 'slug',
							title: 'ID',
							options: {
								source: 'title',
								slugify: (input) =>
									input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
							},
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'prefix',
							title: 'Tab Prefix',
							initialValue: 'none',
							type: 'string',
							options: {
								list: [
									{ title: 'None', value: 'none' },
									{ title: 'Icon', value: 'icon' },
									{ title: 'Image', value: 'image' },
								],
								layout: 'radio',
							},
						},
						{
							name: 'icon',
							title: 'Icon',
							type: 'iconPicker',
							hidden: ({ parent }) => parent.prefix !== 'icon',
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
												component: () => (
													<Component width="1.5em" height="1em" />
												),
												tags: [name],
											})),
									},
								],
								outputFormat: 'react',
							},
						},
						{
							name: 'image',
							title: 'Image',
							type: 'image',
							hidden: ({ parent }) => parent.prefix !== 'image',
						},
						{
							name: 'content',
							type: 'array',
							title: 'Content',
							of: config,
						},
					],
				},
			],
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
	],
	preview: {
		select: {
			tabs: 'tabs',
			theme: 'theme',
			variant: 'variant',
		},
		prepare({ tabs, theme, variant }) {
			return {
				title: 'Tabs',
				subtitle: `Tabs: ${tabs.length} → Tema: ${theme} → Variante: ${variant}`,
			};
		},
	},
});
