import { CommentIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
	name: 'testimonialWidget',
	type: 'object',
	title: 'Testimonial',
	icon: CommentIcon,
	fields: [
		// {
		// 	name: 'testimonials',
		// 	title: 'Testimonials',
		// 	type: 'reference',
		// 	to: [{ type: 'testimonial' }],
		// 	options: {
		// 		filter: ({ document }) => {
		// 			const selectedCategory = document?.category || 'service';
		// 			return {
		// 				filter: 'categories[] == $category',
		// 				params: { category: selectedCategory },
		// 			};
		// 		},
		// 	},
		// },
		{
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Sobre', value: 'about' },
					{ title: 'Imersão', value: 'immersion' },
					{ title: 'Palestras', value: 'lecture' },
					{ title: 'Atendimentos', value: 'service' },
					{ title: 'Matematizador', value: 'mathematizer' },
					{ title: 'Depoimentos', value: 'testimonial' },
					{ title: 'Ebooks', value: 'ebook' },
					{ title: 'Workshops', value: 'workshop' },
					{ title: 'Mentoria Avançada', value: 'advanced-mentory' },
				],
				layout: 'dropdown',
			},
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
			name: 'rounded',
			title: 'Border Rounded',
			type: 'string',
			initialValue: 'full',
			options: {
				list: [
					{ title: 'None', value: 'none' },
					{ title: 'Large', value: 'lg' },
					{ title: 'Extra Large', value: 'xl' },
					{ title: '2x Extra Large', value: '2xl' },
				],
				layout: 'dropdown',
			},
		},
		{
			name: 'type',
			title: 'Type',
			type: 'string',
			initialValue: 'ANIMATED',
			options: {
				list: [
					{ title: 'Animated', value: 'ANIMATED' },
					{ title: 'Minimalist', value: 'MINIMALIST' },
				],
				layout: 'dropdown',
			},
		},
	],
	preview: {
		select: {
			theme: 'theme',
			variant: 'variant',
			type: 'type',
		},
		prepare({ theme, variant, type }) {
			return {
				title: `Variante: ${variant || 'default'} → Tema: ${theme || 'default'} → ${type}`,
			};
		},
	},
});
