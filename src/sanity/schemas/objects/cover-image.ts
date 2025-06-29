import { MdImage } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'cover-image',
	title: 'Cover Image',
	type: 'object',
	icon: MdImage,
	fields: [
		defineField({
			name: 'small_image',
			title: 'Small Image',
			type: 'image',
		}),
		defineField({
			name: 'large_image',
			title: 'Large Image',
			type: 'image',
		}),
	],
});
