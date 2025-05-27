import * as App from '@/components/app';
import { Button, type buttonVariants } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { cn } from '@/lib/utils';
import {
	type SanityImageSource,
	getImageDimensions,
} from '@sanity/asset-utils';
import { BulbOutlineIcon, LinkIcon } from '@sanity/icons';
import type { VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { urlForImage } from './utils';

const ImageComponent = ({ value }: { value: SanityImageSource }) => {
	const { width, height } = getImageDimensions(value);

	return (
		<Image
			src={urlForImage(value).url()}
			alt=""
			layout="responsive"
			sizes="(max-width: 800px) 100vw, 800px"
			width={width}
			height={height}
			style={{
				// Avoid jumping around with aspect-ratio CSS property
				aspectRatio: width / height,
			}}
			className="rounded-2xl overflow-hidden"
		/>
	);
};

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonType = {
	link: { slug: { current: string } };
	variant: ButtonVariants['variant'];
	theme: ButtonVariants['theme'];
	size: ButtonVariants['size'];
	rounded: ButtonVariants['rounded'];
	fullWidth: ButtonVariants['fullWidth'];
	label: string;
	action: 'link' | 'dialog';
	subject: '';
	icon?: string;
};

const ButtonComponent = ({ value }: { value: ButtonType }) => {
	const { setIsContactDialogOpen } = useApp();
	const pathname = usePathname();
	const router = useRouter();

	const {
		label,
		link,
		variant,
		theme,
		size,
		rounded,
		fullWidth,
		action,
		icon,
		subject,
	} = value;

	const handleClick = () => {
		if (action === 'dialog') {
			setIsContactDialogOpen(true);
		}
	};

	const path = link?.slug?.current ? `/${link.slug.current}` : '/';

	const buttonElement = (
		<Button
			variant={variant}
			theme={theme}
			size={size}
			rounded={rounded}
			fullWidth={fullWidth}
			className="p-5 font-bold"
			onClick={action === 'dialog' ? handleClick : undefined}
		>
			{label}
		</Button>
	);

	return (
		<div className="flex justify-center">
			{action === 'link' ? (
				<Link href={path} className={cn({ 'w-full': fullWidth })}>
					{buttonElement}
				</Link>
			) : (
				buttonElement
			)}
		</div>
	);
};

type TitleVariants = VariantProps<typeof App.titleVariants>;

type TitleType = {
	variant: TitleVariants['variant'];
	size: TitleVariants['size'];
	title: string;
	subtitle?: string;
};

const TitleComponent = ({ value }: { value: TitleType }) => {
	const { title, subtitle, variant, size } = value;

	return (
		<div className="flex flex-col w-full">
			<App.Title variant={variant} size={size}>
				{title}
			</App.Title>
			{subtitle && (
				<App.Subtitle variant={variant} size={size} className="mt-0">
					{subtitle}
				</App.Subtitle>
			)}
		</div>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const HighlightDecorator = (props: any) => {
	return (
		<span className="bg-tertiary text-tertiary-foreground">
			{props.children}
		</span>
	);
};

const blockDecorators = [
	{ title: 'Bold', value: 'strong' },
	{ title: 'Emphasis', value: 'em' },
	{ title: 'Code', value: 'code' },
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
		title: 'link',
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
		title: 'Internal link',
		icon: LinkIcon,
		fields: [
			{
				name: 'reference',
				type: 'reference',
				to: [
					{ type: 'page' },
					// other types you may want to link to
				],
			},
		],
	},
];

export {
	blockDecorators,
	annotations,
	ImageComponent,
	ButtonComponent,
	TitleComponent,
};
