import { MdNavigation } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'navigationSubmenuItem',
	title: 'Navigation Submenu Item',
	type: 'object',
	icon: MdNavigation,
	fields: [
		defineField({
			name: 'navigation_label',
			title: 'Navigation Label',
			type: 'string',
			validation: (Rule) => Rule.required().warning(),
		}),
		defineField({
			name: 'navigation_item_url',
			title: 'Navigation Item',
			type: 'link',
		}),
	],
});
