import { MdSmartButton } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'grid',
	title: 'Grid',
	type: 'object',
	icon: MdSmartButton,
	fields: [
		defineField({
			name: 'columns',
			title: 'Num. of Columns',
			type: 'number',
			initialValue: 4,
			validation: (Rule) =>
				Rule.custom((field) => {
					if (!field) {
						return 'This field must not be empty.';
					}

					if (field > 5) {
						return 'This field must not be greater than 5.';
					}
					return true;
				}).warning(),
		}),
		defineField({
			name: 'rows',
			title: 'Num. of Rows',
			type: 'number',
			initialValue: 4,
			validation: (Rule) =>
				Rule.custom((field) => {
					if (!field) {
						return 'This field must not be empty.';
					}

					if (field > 5) {
						return 'This field must not be greater than 5.';
					}
					return true;
				}).warning(),
		}),
	],
});
