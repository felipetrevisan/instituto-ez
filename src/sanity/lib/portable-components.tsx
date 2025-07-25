import { BulbOutlineIcon, LinkIcon } from '@sanity/icons';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const HighlightDecorator = (props: any) => {
	return (
		<span className="bg-tertiary text-tertiary-foreground">
			{props.children}
		</span>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const TextAlignDecorator = (props: any, align: string) => {
	const alignMap = {
		center: 'text-center',
		right: 'text-right',
		left: 'text-left',
		justify: 'text-justify',
	} as const;

	const classes = alignMap[align as keyof typeof alignMap];

	return <div className={classes}>{props.children}</div>;
};

const basicDecorators = [
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
	{
		title: 'Center',
		value: 'center',
		icon: <AlignCenterIcon size={11} />,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		component: (props: any) => TextAlignDecorator(props, 'center'),
	},
	{
		title: 'Right',
		value: 'right',
		icon: <AlignRightIcon size={11}/>,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		component: (props: any) => TextAlignDecorator(props, 'right'),
	},
	{
		title: 'Left',
		value: 'left',
		icon: <AlignLeftIcon size={11} />,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		component: (props: any) => TextAlignDecorator(props, 'left'),
	},
	{
		title: 'Justify',
		value: 'justify',
		icon: <AlignJustifyIcon size={11} />,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		component: (props: any) => TextAlignDecorator(props, 'justify'),
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

export { decorators, annotations, basicDecorators };
