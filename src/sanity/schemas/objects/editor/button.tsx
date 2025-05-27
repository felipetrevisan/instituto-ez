import { LinkIcon, MenuIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { preview } from 'sanity-plugin-icon-picker';

export default defineType({
	name: 'buttonLink',
	type: 'object',
	title: 'Button',
	icon: MenuIcon,
	fields: [
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
					{ title: 'Link', value: 'link' },
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
			name: 'rounded',
			title: 'Rounded',
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
		{
			name: 'full_width',
			title: 'Full Width',
			type: 'boolean',
			initialValue: 'small',
			options: {
				list: [
					{ title: 'Yes', value: true },
					{ title: 'No', value: false },
				],
				layout: 'switch',
			},
		},
		{
			name: 'label',
			title: 'Label',
			type: 'string',
		},
		{
			title: 'Icon',
			name: 'icon',
			type: 'iconPicker',
			options: {
				outputFormat: 'react',
			},
		},
		{
			name: 'action',
			title: 'Action',
			type: 'string',
			initialValue: 'link',
			options: {
				list: [
					{ title: 'Link', value: 'link' },
					{ title: 'Dialog', value: 'dialog' },
				],
				layout: 'radio',
			},
		},
		{
			name: 'link',
			title: 'Link',
			description: 'Select a page or post to link button',
			type: 'reference',
			hidden: ({ parent }) => parent.action !== 'link',
			to: [{ type: 'page' }],
		},
		{
			name: 'subject',
			title: 'Dialog Subject',
			type: 'string',
			hidden: ({ parent }) => parent.action !== 'dialog',
			initialValue: 'link',
			options: {
				list: [
					{ title: 'Sobre Nós', value: 'Sobre Nós' },
					{ title: 'Atendimento', value: 'Atendimento' },
					{ title: 'Imersão', value: 'Imersão' },
					{ title: 'Workshops', value: 'Workshops' },
					{ title: 'Palestras', value: 'Palestras' },
					{ title: 'Matematizador', value: 'Matematizador' },
					{ title: 'Mentoria', value: 'Mentoria' },
					{ title: 'Treinamentos', value: 'Treinamentos' },
				],
				layout: 'dropdown',
			},
		},
	],
	preview: {
		select: {
			title: 'label',
			linkTitle: 'link.title',
			variant: 'variant',
			theme: 'theme',
			icon: 'icon.provider',
		},
		prepare({ title, linkTitle, variant, theme, icon }) {
			return {
				title: `Botão: ${title || 'Sem texto'}`,
				subtitle: `${variant || 'default'} → ${theme || 'default'} → ${linkTitle || 'Sem link'}`,
				media: preview(icon),
			};
		},
	},
});
