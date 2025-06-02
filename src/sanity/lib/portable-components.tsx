import { BulbOutlineIcon, LinkIcon } from '@sanity/icons';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const HighlightDecorator = (props: any) => {
	return (
		<span className="bg-tertiary text-tertiary-foreground">
			{props.children}
		</span>
	);
};

const styles = [
	{ title: 'Center', value: 'center' },
	{ title: 'Right', value: 'right' },
	{ title: 'Left', value: 'left' },
	{ title: 'Justify', value: 'justify' },
];

const decorators = [
	{ title: 'Bold', value: 'strong' },
	{ title: 'Emphasis', value: 'em' },
	{ title: 'Code', value: 'code' },
	{ title: 'Underline', value: 'underline' },
	{
		title: 'Highlight',
		value: 'highlight',
		icon: BulbOutlineIcon,
		component: HighlightDecorator,
	},
];

const annotations = [
	{
		name: 'link',
		type: 'object',
		title: 'Link',
		fields: [
			{
				name: 'url',
				type: 'url',
			},
		],
	},
	{
		name: 'internalLink',
		type: 'object',
		title: 'Internal Link',
		icon: LinkIcon,
		fields: [
			{
				name: 'reference',
				type: 'reference',
				to: [{ type: 'page' }],
			},
		],
	},
];

export {
	decorators,
	annotations,
	styles,
};
